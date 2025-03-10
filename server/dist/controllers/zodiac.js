"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateZodiacAndSave = void 0;
const express = require('express');
const userHistory_1 = require("../models/userHistory");
const zodiac_1 = require("../models/zodiac");
const login_1 = require("../models/login"); // ✅ เพิ่มโมเดล Account เพื่อดึงข้อมูลผู้ใช้
// ตารางลัคนาราศีที่รองรับเวลาเกิด (แบ่งช่วง 2 ชั่วโมง)
const zodiacTable = {
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
const zodiacMapping = {
    "มังกร": "Capricorn", "กุมภ์": "Aquarius", "มีน": "Pisces",
    "เมษ": "Aries", "พฤษภ": "Taurus", "เมถุน": "Gemini",
    "กรกฎ": "Cancer", "สิงห์": "Leo", "กันย์": "Virgo",
    "ตุลย์": "Libra", "พิจิก": "Scorpio", "ธนู": "Sagittarius"
};
const calculateZodiacAndSave = async (req, res) => {
    try {
        let { userID, birthdate, birthtime } = req.body; // ✅ รับวันเกิด + เวลาเกิดจากผู้ใช้
        if (!userID) {
            throw new Error("กรุณาระบุ userID");
        }
        // ✅ ดึงข้อมูลผู้ใช้จาก MongoDB
        const user = await login_1.Account.findById(userID).lean();
        if (!user) {
            throw new Error("ไม่พบผู้ใช้ในระบบ");
        }
        // ✅ ถ้าไม่มี `birthdate` หรือ `birthtime` ให้ดึงจาก MongoDB
        if (!birthdate)
            birthdate = user.birthday || null;
        // ✅ ถ้ายังไม่มี `birthdate` หรือ `birthtime` ให้แจ้งให้กรอก
        if (!birthdate || !birthtime) {
            throw new Error("ไม่พบข้อมูลวันเกิดของคุณ กรุณากรอกวันเกิดและเวลาเกิด");
        }
        console.log("📌 คำนวณลัคนาราศี:", birthdate, birthtime);
        // ✅ แปลงรูปแบบวันเกิดให้อยู่ใน `DD/MM/YYYY` หรือ `YYYY-MM-DD`
        let dateParts;
        if (birthdate.includes("-")) {
            dateParts = birthdate.split("-").map(Number); // `YYYY-MM-DD` → `[YYYY, MM, DD]`
        }
        else if (birthdate.includes("/")) {
            dateParts = birthdate.split("/").map(Number); // `DD/MM/YYYY` → `[DD, MM, YYYY]`
        }
        else {
            throw new Error("รูปแบบวันเกิดไม่ถูกต้อง ควรเป็น YYYY-MM-DD หรือ DD/MM/YYYY");
        }
        const day = birthdate.includes("/") ? dateParts[0] : dateParts[2]; // ✅ ใช้ค่าจาก `birthdate`
        const monthIndex = birthdate.includes("/") ? dateParts[1] : dateParts[1]; // ✅ ใช้เดือนตามปกติ (1-12)
        // ✅ แปลงเวลาเกิดเป็น `hour`
        const hour = parseInt(birthtime.split(':')[0], 10);
        // ✅ แปลงชื่อเดือนเป็นตัวเลข (ถ้าจำเป็น)
        const monthNames = {
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
            return ((monthIndex > start.month || (monthIndex === start.month && day >= start.day)) &&
                (monthIndex < end.month || (monthIndex === end.month && day <= end.day)));
        });
        if (!selectedRangeKey) {
            return res.status(400).json({ error: "ข้อมูลเดือนเกิดไม่ถูกต้อง" });
        }
        let selectedRange = zodiacTable[selectedRangeKey];
        // ✅ คำนวณราศีตามช่วงเวลา
        let slotIndex = timeSlots.findIndex(slot => hour >= slot && hour < (slot + 2));
        if (slotIndex === -1)
            slotIndex = timeSlots.length - 1;
        let thaiZodiac = selectedRange[slotIndex];
        console.log(`✅ ลัคนาราศีที่ได้ (ไทย): ${thaiZodiac}`);
        // ✅ แปลงราศีเป็นภาษาอังกฤษ
        let englishZodiac = zodiacMapping[thaiZodiac] || thaiZodiac;
        console.log(`✅ ลัคนาราศีที่ได้ (อังกฤษ): ${englishZodiac}`);
        // ✅ ค้นหาข้อมูลราศีจาก MongoDB
        const zodiacInfo = await zodiac_1.Zodiac.findOne({ cardNAME: { $regex: `^${englishZodiac}$`, $options: "i" } }).lean();
        if (!zodiacInfo) {
            return res.status(404).json({ error: `ไม่พบข้อมูลราศีใน MongoDB: ${englishZodiac}` });
        }
        console.log("✅ ข้อมูลราศีที่ดึงมา:", zodiacInfo);
        // ✅ บันทึกลง MongoDB
        const historyEntry = await userHistory_1.UserHistory.create({
            userID,
            type: "zodiac",
            zodiacSign: thaiZodiac,
            birthdate,
            birthtime,
            zodiacImage: zodiacInfo.cardPHOTO,
            zodiacPrediction: zodiacInfo.cardMEANING
        });
        return res.json({
            message: "คำนวณลัคนาราศีสำเร็จและบันทึกประวัติแล้ว",
            userID,
            birthdate,
            birthtime,
            zodiacSign: thaiZodiac,
            englishZodiac,
            zodiacImage: zodiacInfo.cardPHOTO,
            zodiacPrediction: zodiacInfo.cardMEANING,
            historyID: historyEntry._id
        });
    }
    catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error.message);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
exports.calculateZodiacAndSave = calculateZodiacAndSave;
//# sourceMappingURL=zodiac.js.map