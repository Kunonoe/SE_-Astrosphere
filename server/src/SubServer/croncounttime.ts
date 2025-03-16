import cron from "node-cron";
import { sendScheduledMessages } from "./sendmessages";

// ✅ ตั้ง Cron Job ให้รันทุกๆ 10 นาที
cron.schedule("*/10 * * * *", async () => {
    console.log("🔔 Running scheduled message sender every 5 minutes...");
    await sendScheduledMessages();
});
