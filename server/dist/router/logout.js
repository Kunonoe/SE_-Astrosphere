"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout_1 = require("../Controllers/logout");
exports.default = (router) => {
    router.post("/logout", logout_1.logout);
};
//# sourceMappingURL=logout.js.map