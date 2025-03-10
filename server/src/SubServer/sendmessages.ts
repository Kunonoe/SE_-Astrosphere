import { Message } from "../models/message";
import { sendMessage } from "../utils/sendMessage";
import { Account } from "../models/login";

export const sendScheduledMessages = async () => {
    try {
        const now = new Date(); // เวลาปัจจุบัน
        now.setSeconds(0, 0); // ปรับให้เหลือแค่ชั่วโมงและนาที

        // ค้นหาข้อความที่ถึงเวลาส่ง (`sendDate` ต้องตรงกับ `now`)
        const messages = await Message.find({ sendDate: now, status: false });

        for (const msg of messages) {
            const user = await Account.findById(msg.userID);
            if (!user || !user.email) continue; // ถ้า user ไม่มี email ข้ามไป

            const isSent = await sendMessage(user.email, msg.content);
            if (!isSent) continue; // ถ้าส่งไม่สำเร็จ ข้ามไปข้อความถัดไป

            console.log(`📩 ส่งข้อความให้ ${user.email} แล้ว`);

            // อัปเดตสถานะเป็นส่งแล้ว พร้อมบันทึกเวลา
            await Message.findByIdAndUpdate(msg._id, { 
                status: true,
                sentAt: new Date() // บันทึกเวลาที่ส่งสำเร็จ
            });
        }
    } catch (error) {
        console.error("❌ Error in sendScheduledMessages:", error);
    }
};
