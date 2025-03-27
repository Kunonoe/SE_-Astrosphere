"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zodiac = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ZodiacSchema = new mongoose_1.default.Schema({
    cardID: Number,
    cardNAME: String,
    cardMEANING: String,
    cardPHOTO: String
}, { collection: "zodiac_cards" }); //  เชื่อมกับ Collection `zodiac_cards`
exports.Zodiac = mongoose_1.default.model("Zodiac", ZodiacSchema);
//# sourceMappingURL=zodiac.js.map