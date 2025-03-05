import { Request, Response, Router } from "express";
import { Tarot } from "../models/tarocard";

export default (router: Router) => {
    router.get('/tarot', async (req: Request, res: Response) => {
        try {
            // ดึงไพ่ทั้งหมดจาก MongoDB
            const allTarotCards = await Tarot.find().lean();
            
            if (allTarotCards.length < 3) {
                return res.status(400).json({ error: "ไพ่ไม่เพียงพอสำหรับการสุ่ม" });
            }

            // **สุ่มไพ่ 3 ใบ ไม่ซ้ำกัน**
            const shuffled = allTarotCards.sort(() => 0.5 - Math.random());
            const selectedCards = shuffled.slice(0, 3);

            console.log("✅ ไพ่ที่สุ่มได้:", selectedCards);

            return res.json({
                draw1: selectedCards[0],   // อดีต
                draw2: selectedCards[1], // ปัจจุบัน
                draw3: selectedCards[2]   // อนาคต
            });
        } catch (error) {
            console.error("❌ เกิดข้อผิดพลาดในการสุ่มไพ่", error);
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
        }
    });

    return router;
};
