import { Request, Response } from "express";
import { Tarot } from "../models/tarocard";
import connectDB from "../database/database"

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