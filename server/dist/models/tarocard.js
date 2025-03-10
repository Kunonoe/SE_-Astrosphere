"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarot = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TarotSchema = new mongoose_1.default.Schema({
    cardID: Number,
    cardNAME: String,
    cardMEANING: String,
    cardPHOTO: String
}, { collection: "tarot_cards" }); // ✅ เชื่อมกับ Collection `zodiac_cards`
console.log("✅ ใช้ Collection: tarot_cards");
exports.Tarot = mongoose_1.default.model("Tarot", TarotSchema);
//# sourceMappingURL=tarocard.js.map