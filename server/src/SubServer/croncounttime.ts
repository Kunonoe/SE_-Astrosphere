import cron from "node-cron";
import { sendScheduledMessages } from "./sendmessages";

// ✅ ตั้ง Cron Job ให้รันทุกๆ 5 นาที
cron.schedule("*/1 * * * *", async () => {
    console.log("🔔 Running scheduled message sender every 5 minutes...");
    await sendScheduledMessages();
});
