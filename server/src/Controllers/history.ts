import { Request, Response } from "express";
import { UserHistory } from "../models/userHistory";

// ✅ API ดูประวัติทั้งหมดของผู้ใช้
export const getUserHistory = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({ error: "กรุณาระบุ userID" });
        }

        // 🔹 ค้นหาประวัติทั้งหมดของผู้ใช้
        const history = await UserHistory.find({ userID }).sort({ timestamp: -1 }).lean();

        if (history.length === 0) {
            return res.status(404).json({ error: `ไม่พบประวัติของ ${userID}` });
        }

        return res.json({ userID, history });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงประวัติ", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
