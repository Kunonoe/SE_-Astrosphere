"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tarot_1 = require("../Controllers/tarot");
exports.default = (router) => {
    router.get('/tarotall', tarot_1.ListTarot);
    router.get("/gettarot/:id", tarot_1.getTarotByID);
    return router;
};
//# sourceMappingURL=tarot.js.map