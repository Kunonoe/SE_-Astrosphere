const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';
import { UserHistory } from "../models/userHistory";
import { Zodiac } from '../models/zodiac';

// ตารางลัคนาราศีที่รองรับเวลาเกิด (แบ่งช่วง 2 ชั่วโมง)
const zodiacTable: Record<string, string[]> = {
    "15 ม.ค. - 12 ก.พ.": ["มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู"],
    "13 ก.พ. - 13 มี.ค.": ["กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร"],
    "14 มี.ค. - 12 เม.ย.": ["มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์"],
    "13 เม.ย. - 13 พ.ค.": ["เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน"],
    "14 พ.ค. - 14 มิ.ย.": ["พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ"],
    "15 มิ.ย. - 16 ก.ค.": ["เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ"],
    "17 ก.ค. - 16 ส.ค.": ["กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน"],
    "17 ส.ค. - 16 ก.ย.": ["สิงห์", "กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ"],
    "17 ก.ย. - 16 ต.ค.": ["กันย์", "ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์"],
    "17 ต.ค. - 15 พ.ย.": ["ตุลย์", "พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์"],
    "16 พ.ย. - 15 ธ.ค.": ["พิจิก", "ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์"],
    "16 ธ.ค. - 14 ม.ค.": ["ธนู", "มังกร", "กุมภ์", "มีน", "เมษ", "พฤษภ", "เมถุน", "กรกฎ", "สิงห์", "กันย์", "ตุลย์", "พิจิก"]
};
const timeSlots = [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 1, 3];
// ✅ แปลงชื่อราศีจากไทย -> อังกฤษ
const zodiacMapping: Record<string, string> = {
    "มังกร": "Capricorn", "กุมภ์": "Aquarius", "มีน": "Pisces",
    "เมษ": "Aries", "พฤษภ": "Taurus", "เมถุน": "Gemini",
    "กรกฎ": "Cancer", "สิงห์": "Leo", "กันย์": "Virgo",
    "ตุลย์": "Libra", "พิจิก": "Scorpio", "ธนู": "Sagittarius"
};
export const calculateZodiacAndSave = async (req: Request) => {
    try {
        const { userID, birthdate, birthtime } = req.body;
        if (!userID || !birthdate || !birthtime) {
            throw new Error("กรุณาระบุ userID, วันเกิด และเวลาเกิด");
        }

        console.log("📌 คำนวณลัคนาราศี:", birthdate, birthtime);
        const date = new Date(birthdate);
        const monthIndex: number = date.getMonth() + 1; // ✅ แปลงเดือนให้เป็นตัวเลข
        const day: number = date.getDate();
        const hour: number = parseInt(birthtime.split(':')[0], 10);

        // ✅ แปลงชื่อเดือนเป็นตัวเลข
        const monthNames: Record<string, number> = {
            "ม.ค.": 1, "ก.พ.": 2, "มี.ค.": 3, "เม.ย.": 4,
            "พ.ค.": 5, "มิ.ย.": 6, "ก.ค.": 7, "ส.ค.": 8,
            "ก.ย.": 9, "ต.ค.": 10, "พ.ย.": 11, "ธ.ค.": 12
        };

        // ✅ หา `selectedRange`
        let selectedRangeKey = Object.keys(zodiacTable).find(range => {
            const [start, end] = range.split(' - ').map(date => {
                const [d, m] = date.split(' ');
                return { day: parseInt(d, 10), month: monthNames[m] };
            });

            return (
                (monthIndex > start.month || (monthIndex === start.month && day >= start.day)) &&
                (monthIndex < end.month || (monthIndex === end.month && day <= end.day))
            );
        });

        if (!selectedRangeKey) {
            throw new Error("ข้อมูลเดือนเกิดไม่ถูกต้อง");
        }

        let selectedRange = zodiacTable[selectedRangeKey];

        // ✅ คำนวณราศีตามช่วงเวลา
        let slotIndex = timeSlots.findIndex((slot, index) => {
            let nextSlot = timeSlots[index + 1] || timeSlots[0];
            return hour >= slot && hour < nextSlot;
        });

        if (slotIndex === -1) slotIndex = 0;

        let thaiZodiac = selectedRange[slotIndex];
        console.log(`✅ ลัคนาราศีที่ได้ (ไทย): ${thaiZodiac}`);

        // ✅ แปลงราศีเป็นภาษาอังกฤษ
        let englishZodiac = zodiacMapping[thaiZodiac] || thaiZodiac;
        console.log(`✅ ลัคนาราศีที่ได้ (อังกฤษ): ${englishZodiac}`);

        // ✅ บันทึกลง MongoDB
        const historyEntry = await UserHistory.create({
            userID,
            type: "zodiac",
            zodiacSign: thaiZodiac,
            birthdate,
            birthtime
        });

        // ✅ ค้นหาข้อมูลราศีจาก MongoDB
        const zodiacInfo = await Zodiac.findOne({ cardNAME: { $regex: `^${englishZodiac}$`, $options: "i" } }).lean();
        if (!zodiacInfo) {
            throw new Error(`ไม่พบข้อมูลราศีใน MongoDB: ${englishZodiac}`);
        }

        console.log("✅ ข้อมูลราศีที่ดึงมา:", zodiacInfo);

        return {
            userID,
            birthdate,
            birthtime,
            zodiacSign: thaiZodiac,
            englishZodiac,
            historyID: historyEntry._id,
            zodiacData: zodiacInfo
        };

    } catch (error: any) {
        console.error("❌ เกิดข้อผิดพลาด:", error.message);
        throw new Error(error.message);
    }
};