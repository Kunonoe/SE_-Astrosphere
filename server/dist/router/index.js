"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const otp_1 = __importDefault(require("./otp"));
const message_1 = __importDefault(require("./message"));
const zodiac_1 = __importDefault(require("./zodiac"));
const tarot_1 = __importDefault(require("./tarot"));
const review_1 = __importDefault(require("./review"));
const history_1 = __importDefault(require("./history"));
require("../SubServer/croncounttime");
const router = express_1.default.Router();
exports.default = () => {
    (0, login_1.default)(router);
    (0, logout_1.default)(router);
    (0, otp_1.default)(router);
    (0, message_1.default)(router);
    (0, zodiac_1.default)(router);
    (0, tarot_1.default)(router);
    (0, review_1.default)(router);
    (0, history_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map