"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const sendmessages_1 = require("./sendmessages");
// ตั้ง Cron Job ให้รันทุกๆ เที่ยงคืน 1 นาที "* * * * *" เทส ทุกๆ1นาที
node_cron_1.default.schedule("* * * * *", async () => {
    console.log("🔔 Running scheduled message sender once a day at 00:01...");
    await (0, sendmessages_1.sendScheduledMessages)();
});
//# sourceMappingURL=croncounttime.js.map