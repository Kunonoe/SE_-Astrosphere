import cron from "node-cron";
import { sendScheduledMessages } from "./sendmessages";


// ตั้ง Cron Job ให้รันทุกๆ เที่ยงคืน 1 นาที "1 0 * * *" 
cron.schedule("* * * * *", async () => { //เทส ทุกๆ1นาที
    console.log("🔔 Running scheduled message sender once a day at 00:01...");
    await sendScheduledMessages();
});
