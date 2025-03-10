"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendmessages_1 = require("../SubServer/sendmessages");
exports.default = (router) => {
    router.get('/test-auto-send', async (req, res) => {
        await (0, sendmessages_1.sendScheduledMessages)();
        res.send({ status: "success", message: "AutoSend tested successfully." });
    });
};
//# sourceMappingURL=message.js.map