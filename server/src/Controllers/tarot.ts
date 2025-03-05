import { Request, Response } from "express";
import { Tarot } from "../models/tarocard";
import { UserHistory } from "../models/userHistory";

// ✅ ฟังก์ชันสุ่มไพ่ทาโรต์ 3 ใบ
export const drawTarot = async (req: Request, res: Response) => {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.status(400).json({ error: "กรุณาระบุ userID" });
        }
        // ดึงไพ่ทั้งหมดจาก MongoDB
        const allTarotCards = await Tarot.find().lean();
        
        if (allTarotCards.length < 3) {
            return res.status(400).json({ error: "ไพ่ไม่เพียงพอสำหรับการสุ่ม" });
        }

        // **สุ่มไพ่ 3 ใบ ไม่ซ้ำกัน**
        const shuffled = allTarotCards.sort(() => 0.5 - Math.random());
        const selectedCards = shuffled.slice(0, 3);

        console.log("✅ ไพ่ที่สุ่มได้:", selectedCards);
        // 🔹 บันทึกลง `user_history`
        const historyEntry = await UserHistory.create({
            userID,
            type: "tarot",
            drawnCards: selectedCards
        });

        return res.json({
            message: "สุ่มไพ่สำเร็จและบันทึกประวัติแล้ว",
            userID,
            drawnCards: selectedCards,
            historyID: historyEntry._id
        });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการสุ่มไพ่", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
