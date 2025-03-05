import { Request, Response, Router } from "express";
import { Zodiac } from "../models/zodiac";
import { calculateZodiac } from "../controllers/zodiac";

const zodiacMapping: Record<string, string> = {
    "มังกร": "Capricorn", "กุมภ์": "Aquarius", "มีน": "Pisces",
    "เมษ": "Aries", "พฤษภ": "Taurus", "เมถุน": "Gemini",
    "กรกฎ": "Cancer", "สิงห์": "Leo", "กันย์": "Virgo",
    "ตุลย์": "Libra", "พิจิก": "Scorpio", "ธนู": "Sagittarius"
};

export default (router: Router) => {
    // API คำนวณลัคนาราศีและดึงข้อมูลจาก MongoDB
    router.post('/calculate', async (req: Request, res: Response) => {
        const { birthdate, birthtime } = req.body;

        if (!birthdate || !birthtime) {
            return res.status(400).json({ error: "กรุณาระบุวันเกิดและเวลาเกิด" });
        }

        // 1️⃣ คำนวณลัคนาราศี
        const result = calculateZodiac(birthdate, birthtime);

        if (!result.zodiacSign) {
            return res.status(400).json({ error: "ไม่สามารถคำนวณลัคนาราศีได้" });
        }

        // 2️⃣ แปลงชื่อราศีจากไทยเป็นอังกฤษก่อนค้นหา
        const englishZodiac = zodiacMapping[result.zodiacSign] || result.zodiacSign;
        console.log(`✅ กำลังค้นหาใน MongoDB: ${englishZodiac}`);

        try {
            // 🔍 Debug: ดูว่าเชื่อมกับ Database ไหน
            console.log(`✅ ใช้ Database: ${process.env.MONGO_URL}`);

            // 3️⃣ ตรวจสอบว่า MongoDB มีข้อมูลหรือไม่
            const allZodiacs = await Zodiac.find().lean();
            console.log("🔍 ข้อมูลทั้งหมดใน MongoDB:", allZodiacs);

            // 4️⃣ ค้นหาข้อมูลใน MongoDB (กรณีตัวพิมพ์ใหญ่/เล็กไม่ตรงกัน)
            const zodiacInfo = await Zodiac.findOne({ cardNAME: { $regex: `^${englishZodiac}$`, $options: "i" } }).lean();

            if (!zodiacInfo) {
                console.error(`❌ ไม่พบข้อมูลใน MongoDB สำหรับราศี: ${englishZodiac}`);
                return res.status(404).json({ error: `ไม่พบข้อมูลราศี ${result.zodiacSign}` });
            }

            console.log(`✅ พบข้อมูลราศีใน MongoDB:`, zodiacInfo);

            return res.json({
                birthdate,
                birthtime,
                zodiacSign: result.zodiacSign,
                meaning: zodiacInfo.cardMEANING,
                photo: zodiacInfo.cardPHOTO
            });
        } catch (error) {
            console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูลจาก MongoDB", error);
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
        }
    });

    return router; // ✅ แก้ return router ให้อยู่ในตำแหน่งที่ถูกต้อง
};
