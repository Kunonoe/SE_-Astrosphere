import { Request, Response } from "express";
import { Tarot } from "../models/tarocard";
import connectDB from "../database/database"

// ✅ ฟังก์ชันสุ่มไพ่ทาโรต์ 3 ใบ
export const drawTarot = async (req: Request, res: Response) => {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.status(400).json({ error: "กรุณาระบุ userID" });
        }
        // ดึงไพ่ทั้งหมดจาก MongoDB
        await connectDB();
        const allTarotCards = await Tarot.find().lean();
        
        if (allTarotCards.length < 3) {
            return res.status(400).json({ error: "ไพ่ไม่เพียงพอสำหรับการสุ่ม" });
        }

        // **สุ่มไพ่ 3 ใบ ไม่ซ้ำกัน**
        const shuffled = allTarotCards.sort(() => 0.5 - Math.random());
        // ✅ สุ่มไพ่ 1 ใบ (แบบเดียวกับราศีที่แสดง 1 ค่า)
        const selectedCards = shuffled.slice(0, 3);

        return res.json({
            message: "สุ่มไพ่สำเร็จและบันทึกประวัติแล้ว",
            userID,
            tarotCards: [
                {
                    tarotName: selectedCards[0].cardNAME,
                    tarotPrediction: selectedCards[0].cardMEANING,
                    tarotImage: selectedCards[0].cardPHOTO
                },
                {
                    tarotName: selectedCards[1].cardNAME,
                    tarotPrediction: selectedCards[1].cardMEANING,
                    tarotImage: selectedCards[1].cardPHOTO
                },
                {
                    tarotName: selectedCards[2].cardNAME,
                    tarotPrediction: selectedCards[2].cardMEANING,
                    tarotImage: selectedCards[2].cardPHOTO
                }
            ],
        });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการสุ่มไพ่", error.message);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};

export const ListTarot = async (req: Request, res: Response): Promise<Response> => {
    try {
        await connectDB();
        const cards = await Tarot.find({}).lean();
        return res.json({ cards });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการแสดงรายการไพ่:", (error as Error).message);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};

export const getTarotByID = async (req: Request, res: Response): Promise<Response> => {
    try {
        await connectDB();
        const card = await Tarot.findOne({ cardID: Number(req.params.id) }).lean();
        console.log(card);
        
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }

        return res.json(card);
    } catch (error) {
        console.error("❌ Error fetching tarot card:", error);
        return res.status(500).json({ error: "Server error" });
    }
};