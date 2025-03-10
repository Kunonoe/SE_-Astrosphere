"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, required: true }, // ✅ เปลี่ยนเป็น ObjectId
    username: { type: String, required: true },
    cardID: { type: mongoose_1.default.Schema.Types.ObjectId, required: true }, // ✅ ใช้ ObjectId แทน Number
    cardType: { type: String, enum: ["zodiac", "tarot"], required: true },
    cardName: { type: String, required: true },
    cardImage: { type: String, required: true },
    userPrediction: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { collection: "reviews" });
exports.Review = mongoose_1.default.model("Review", ReviewSchema);
//# sourceMappingURL=review.js.map