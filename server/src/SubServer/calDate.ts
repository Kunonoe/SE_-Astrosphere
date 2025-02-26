import { sendMessage } from "../utils/sendMessage";
import { Message } from "../models/message";
import { Account } from "../models/login";

const oneDay = 24 * 60 * 60 * 1000; // 1 วันใน milliseconds

export const autoSend = () => {

    setInterval(async () => {
        try {

            const messages = await Message.find({ sendDate: { $lt: Date.now() }, status: false });

            for (let i = 0; i < messages.length; i++) {
                const user = await Account.findById(messages[i].userID)
                const isSent = await sendMessage(user.email, messages[i].content)

                if (!isSent) {
                    continue;
                }

                console.log(`ส่งข้อความวันนี้! 📩 ให้ ${user.username} แล้ว`);

                await Message.findByIdAndUpdate(messages[i]._id, {
                    status: true
                })
            }
        } catch (error) {
            console.error(error);
        }

    }, oneDay);

}
