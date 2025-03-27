import cron from "node-cron";
import { sendScheduledMessages } from "./sendmessages";


// ตั้ง Cron Job ให้รันทุกๆ เที่ยงคืน 1 นาที "*/10 * * * *" เทส ทุกๆ10นาที
cron.schedule("1 0 * * *", async () => {
    console.log("🔔 Running scheduled message sender once a day at 00:01...");
    await sendScheduledMessages();
});
