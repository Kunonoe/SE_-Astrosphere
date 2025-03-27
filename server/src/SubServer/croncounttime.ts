import cron from "node-cron";
import { sendScheduledMessages } from "./sendmessages";


// ตั้ง Cron Job ให้รันทุกๆ เที่ยงคืน 1 นาที "* * * * *" เทส ทุกๆ1นาที
cron.schedule("* * * * *", async () => {
    console.log("🔔 Running scheduled message sender once a day at 00:01...");
    await sendScheduledMessages();
});
