"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodiac_1 = require("../Controllers/zodiac");
exports.default = (router) => {
    router.post('/zodiac', zodiac_1.calculateZodiacAndSave);
    return router;
};
//# sourceMappingURL=zodiac.js.map