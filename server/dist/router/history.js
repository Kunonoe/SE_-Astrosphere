"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = require("../controllers/history");
exports.default = (router) => {
    // ✅ API ดูประวัติการใช้งานของผู้ใช้
    router.get('/history/:userID', history_1.getUserHistory);
    return router;
};
//# sourceMappingURL=history.js.map