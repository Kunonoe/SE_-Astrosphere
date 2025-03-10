"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendScheduledMessages = void 0;
const message_1 = require("../models/message");
const sendMessage_1 = require("../utils/sendMessage");
const login_1 = require("../models/login");
const sendScheduledMessages = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // เซ็ตให้เป็น 00:00:00 ของวันนี้
        // ค้นหาข้อความที่ต้องส่งวันนี้ (`sendDate` ตรงกับ `today`)
        const messages = await message_1.Message.find({ sendDate: today, status: false });
        for (const msg of messages) {
            const user = await login_1.Account.findById(msg.userID);
            if (!user || !user.email)
                continue; // ถ้า user ไม่มี email ข้ามไป
            const isSent = await (0, sendMessage_1.sendMessage)(user.email, msg.content);
            if (!isSent)
                continue; // ถ้าส่งไม่สำเร็จ ข้ามไปข้อความถัดไป
            console.log(`📩 ส่งข้อความให้ ${user.email} แล้ว`);
            // อัปเดตสถานะเป็นส่งแล้ว
            await message_1.Message.findByIdAndUpdate(msg._id, { status: true });
        }
    }
    catch (error) {
        console.error("❌ Error in sendScheduledMessages:", error);
    }
};
exports.sendScheduledMessages = sendScheduledMessages;
//# sourceMappingURL=sendmessages.js.map