import { Request, Response } from 'express';
import { Zodiac } from '../models/zodiac';
import { zodiacTable, timeSlots, zodiacMapping } from "../utils/zodiacData";


export const calculateZodiacAndSave = async (req: Request, res: Response) => {
    try {
        let { birthdate, birthtime } = req.body;
        console.log("📌 คำนวณลัคนาราศี:", birthdate, birthtime);

        // ตรวจสอบรูปแบบวันเกิด (YYYY-MM-DD หรือ DD/MM/YYYY)
        let dateParts: number[];
        if (birthdate.includes("-")) {
            dateParts = birthdate.split("-").map(Number);
        } else if (birthdate.includes("/")) {
            dateParts = birthdate.split("/").map(Number);
        } else {
            return res.status(400).json({ error: "รูปแบบวันเกิดไม่ถูกต้อง ควรเป็น YYYY-MM-DD หรือ DD/MM/YYYY" });
        }

        const day = birthdate.includes("/") ? dateParts[0] : dateParts[2];
        const monthIndex = dateParts[1] - 1;

        // แปลง monthIndex เป็นชื่อเดือนภาษาไทย
        const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        const monthAbbreviation = thaiMonths[monthIndex];

        if (!monthAbbreviation) {
            return res.status(400).json({ error: "รูปแบบเดือนเกิดไม่ถูกต้อง" });
        }

        // แปลงเวลาเกิดเป็นชั่วโมง
        if (!birthtime.includes(":")) {
            return res.status(400).json({ error: "รูปแบบเวลาเกิดไม่ถูกต้อง ควรเป็น HH:MM" });
        }
        const hour = parseInt(birthtime.split(":"[0]), 10);
        if (isNaN(hour)) {
            return res.status(400).json({ error: "เวลาเกิดไม่ถูกต้อง กรุณากรอกเวลาเป็น HH:MM" });
        }

        // หา `selectedRange` จาก `zodiacTable`
        let selectedRangeKey = Object.keys(zodiacTable).find(range => {
            const [start, end] = range.split(" - ").map(date => {
                const [d, m] = date.split(" ");
                return { day: parseInt(d, 10), month: thaiMonths.indexOf(m) };
            });
            return (
                (thaiMonths.indexOf(monthAbbreviation) > start.month || 
                (thaiMonths.indexOf(monthAbbreviation) === start.month && day >= start.day)) &&
                (thaiMonths.indexOf(monthAbbreviation) < end.month || 
                (thaiMonths.indexOf(monthAbbreviation) === end.month && day <= end.day))
            );
        });

        if (!selectedRangeKey) {
            return res.status(400).json({ error: "ข้อมูลเดือนเกิดไม่ถูกต้อง" });
        }

        let selectedRange = zodiacTable[selectedRangeKey];

        // คำนวณราศีตามช่วงเวลา
        let slotIndex = timeSlots.findIndex(slot => hour >= slot && hour < (slot + 2));
        if (slotIndex === -1) slotIndex = timeSlots.length - 1;

        let thaiZodiac = selectedRange[slotIndex];
        console.log(`✅ ลัคนาราศีที่ได้ (ไทย): ${thaiZodiac}`);

        // แปลงราศีเป็นภาษาอังกฤษ
        let englishZodiac = zodiacMapping[thaiZodiac] || thaiZodiac;
        console.log(`✅ ลัคนาราศีที่ได้ (อังกฤษ): ${englishZodiac}`);

        // ค้นหาข้อมูลราศีจาก MongoDB
        const zodiacInfo = await Zodiac.findOne({ cardNAME: { $regex: `^${englishZodiac}$`, $options: "i" } }).lean();
        if (!zodiacInfo) {
            return res.status(404).json({ error: `ไม่พบข้อมูลราศีใน MongoDB: ${englishZodiac}` });
        }

        console.log("✅ ข้อมูลราศีที่ดึงมา:", zodiacInfo);

        return res.status(201).json({
            message: "คำนวณลัคนาราศีสำเร็จและบันทึกประวัติแล้ว",
            birthdate,
            birthtime,
            zodiacSign: thaiZodiac,
            englishZodiac,
            zodiacImage: zodiacInfo.cardPHOTO,
            zodiacPrediction: zodiacInfo.cardMEANING,
        });
    } catch (error: any) {
        console.error("❌ เกิดข้อผิดพลาด:", error.message);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
