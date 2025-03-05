const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';

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

export const calculateZodiac = (birthdate: string, birthtime: string): { birthdate: string; birthtime: string; zodiacSign?: string; error?: string } => {
    console.log("📌 คำนวณลัคนาราศี:", birthdate, birthtime);
    
    const date = new Date(birthdate);
    const hour = parseInt(birthtime.split(':')[0]);

    const monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    let selectedRange = Object.keys(zodiacTable).find(range => {
        const [start, end] = range.split(' - ').map(date => {
            const [d, m] = date.split(' ');
            return { day: parseInt(d), month: monthNames.indexOf(m) + 1 };
        });
        return (date.getMonth() + 1 > start.month || (date.getMonth() + 1 === start.month && date.getDate() >= start.day)) &&
               (date.getMonth() + 1 < end.month || (date.getMonth() + 1 === end.month && date.getDate() <= end.day));
    });

    if (!selectedRange) {
        console.log("❌ ข้อมูลเดือนเกิดไม่ถูกต้อง");
        return { birthdate, birthtime, error: "ข้อมูลเดือนเกิดไม่ถูกต้อง" };
    }

    let slotIndex = timeSlots.findIndex(slot => hour >= slot && hour < (slot + 2));
    if (slotIndex === -1) slotIndex = timeSlots.length - 1;

    let zodiacSign = zodiacTable[selectedRange][slotIndex];
    console.log(`✅ ลัคนาราศีที่ได้: ${zodiacSign} (index: ${slotIndex})`);

    return { birthdate, birthtime, zodiacSign };
};

router.post('/calculate', (req: Request, res: Response) => {
    const { birthdate, birthtime } = req.body;
    if (!birthdate || !birthtime) {
        return res.status(400).json({ error: "กรุณาระบุวันเกิดและเวลาเกิด" });
    }
    const result = calculateZodiac(birthdate, birthtime);
    res.json(result);
});

export default router;