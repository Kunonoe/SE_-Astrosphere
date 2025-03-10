import cron from "node-cron";
import { sendScheduledMessages } from "./sendmessages";

// ตั้ง Cron Job ให้รันทุกวันเวลา 00:01 น.
cron.schedule("1 0 * * *", async () => {
    console.log("🔔 Running scheduled message sender...");
    await sendScheduledMessages();
});
