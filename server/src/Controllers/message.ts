import express from "express";
import { Message } from "../models/message";
import mongoose from "mongoose";

export const reciveContent = async (req: express.Request, res: express.Response) => {
    try {
        const { userID, content } = req.body;

        // ✅ ตรวจสอบค่าที่รับมา
        if (!userID || !content) {
            return res.status(400).json({ error: "กรุณากรอก userID และ content" });
        }

        // ✅ ตรวจสอบว่า `userID` เป็น ObjectId ที่ถูกต้อง
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ error: "userID ไม่ถูกต้อง" });
        }

        // ✅ ตั้งค่า `sendDate` เป็น 1 ปีข้างหน้า
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1);

        // ✅ บันทึกข้อความลง MongoDB
        const result = await new Message({
            userID: new mongoose.Types.ObjectId(userID),
            content,
            sendDate: currentDate,
        }).save();

        return res.status(201).json({ 
            status: "success",
            message: "ข้อความถูกบันทึกเรียบร้อย",
            data: result
        });

    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการบันทึกข้อความ:", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
