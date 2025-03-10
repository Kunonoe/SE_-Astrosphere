import { Request, Response } from "express";
import { UserHistory } from "../models/userHistory";

// ✅ API ดูประวัติทั้งหมดของผู้ใช้
export const getUserHistory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "กรุณาระบุ userID" });
        }

        // 🔹 ค้นหาประวัติทั้งหมดของผู้ใช้
        const history = await UserHistory.find({ userId }).sort({ timestamp: -1 }).lean();

        if (history.length === 0) {
            return res.status(404).json({ error: `ไม่พบประวัติของ ${userId}` });
        }

        return res.json({ userId, history });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงประวัติ", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
