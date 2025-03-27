"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../Controllers/message");
exports.default = (router) => {
    router.post('/message', message_1.receiveContent);
};
//# sourceMappingURL=message.js.map