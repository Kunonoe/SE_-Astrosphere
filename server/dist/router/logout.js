"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout_1 = require("../controllers/logout"); // นำเข้า Controller ที่สร้างไว้
exports.default = (router) => {
    router.post("/logout", logout_1.logout);
};
//# sourceMappingURL=logout.js.map