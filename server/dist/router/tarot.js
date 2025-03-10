"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tarot_1 = require("../controllers/tarot"); // ✅ Import ให้ถูกต้อง
exports.default = (router) => {
    // ✅ API สุ่มไพ่ทาโรต์ 3 ใบ
    router.get('/tarot', tarot_1.drawTarot);
    return router;
};
//# sourceMappingURL=tarot.js.map