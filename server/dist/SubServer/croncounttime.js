"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const sendmessages_1 = require("./sendmessages");
// ตั้ง Cron Job ให้รันทุกวันเวลา 00:01 น.
node_cron_1.default.schedule("1 0 * * *", async () => {
    console.log("🔔 Running scheduled message sender...");
    await (0, sendmessages_1.sendScheduledMessages)();
});
//# sourceMappingURL=croncounttime.js.map