"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveContent = void 0;
const message_1 = require("../models/message");
const receiveContent = async (req, res) => {
    try {
        const { userID, content, sendDate } = req.body;
        if (!userID || !content || !sendDate) {
            return res.status(400).send({ status: "error", message: "Missing required fields" });
        }
        // แปลง `sendDate` ให้เป็น Date Object และเซ็ตเวลาเป็น 00:00:00
        const scheduledDate = new Date(sendDate);
        scheduledDate.setHours(0, 0, 0, 0);
        if (isNaN(scheduledDate.getTime())) {
            return res.status(400).send({ status: "error", message: "Invalid sendDate format. Use YYYY-MM-DD" });
        }
        const newMessage = new message_1.Message({
            userID,
            content,
            sendDate: scheduledDate, // บันทึกเฉพาะวันที่
            status: false, // ยังไม่ถูกส่ง
        });
        const result = await newMessage.save();
        if (!result) {
            return res.sendStatus(400);
        }
        return res.send({
            status: "success",
            message: "Message scheduled successfully",
            result,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ status: "error", message: "Internal server error" });
    }
};
exports.receiveContent = receiveContent;
//# sourceMappingURL=message.js.map