"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodiac_1 = require("../controllers/zodiac");
exports.default = (router) => {
    router.post('/calculate', zodiac_1.calculateZodiacAndSave);
    return router;
};
//# sourceMappingURL=zodiac.js.map