"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveContent = void 0;
const message_1 = require("../models/message");
// กำหนดเวลาส่งข้อความเป็น เที่ยงคืน 0 นาที (00:00 น.)
const DEFAULT_SEND_HOUR = 0; // เที่ยงคืน
const DEFAULT_SEND_MINUTE = 0; // 0 นาที
const receiveContent = async (req, res) => {
    try {
        const { userID, content, sendDate } = req.body;
        if (!userID || !content || !sendDate) {
            return res.status(400).send({ status: "error", message: "Missing required fields" });
        }
        // แปลง `sendDate` ให้เป็น Date Object
        const scheduledDate = new Date(sendDate);
        if (isNaN(scheduledDate.getTime())) {
            return res.status(400).send({ status: "error", message: "Invalid sendDate format. Use YYYY-MM-DD" });
        }
        scheduledDate.setHours(DEFAULT_SEND_HOUR, DEFAULT_SEND_MINUTE, 0, 0);
        // Debug: ตรวจสอบค่าก่อนบันทึก
        console.log("📆 sendDate before saving:", scheduledDate);
        console.log("📩 Preparing to save message:", { userID, content, sendDate: scheduledDate });
        const newMessage = new message_1.Message({
            userID,
            content,
            sendDate: scheduledDate, // บันทึกวันที่ + เวลา 00:01
            status: false, // ยังไม่ถูกส่ง
        });
        const result = await newMessage.save();
        // Debug: ตรวจสอบผลลัพธ์หลังบันทึก
        console.log("✅ Save result:", result);
        if (!result) {
            return res.status(400).send({ status: "error", message: "Failed to save message" });
        }
        return res.send({
            status: "success",
            message: `Message scheduled successfully at ${DEFAULT_SEND_HOUR}:${DEFAULT_SEND_MINUTE} on ${sendDate}`,
            result,
        });
    }
    catch (error) {
        console.error("❌ Error in receiveContent:", error);
        return res.status(500).send({ status: "error", message: "Internal server error" });
    }
};
exports.receiveContent = receiveContent;
//# sourceMappingURL=message.js.map