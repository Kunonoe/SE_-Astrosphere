"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHistory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// ✅ Schema สำหรับบันทึกประวัติการใช้งานของผู้ใช้
const UserHistorySchema = new mongoose_1.default.Schema({
    userID: { type: String, required: true },
    type: { type: String, enum: ["tarot", "zodiac"], required: true }, // tarot = สุ่มไพ่, zodiac = คำนวณราศี
    timestamp: { type: Date, default: Date.now },
    // 🔮 ถ้าเป็นไพ่ทาโรต์
    tarotName1: { type: String },
    tarotPrediction1: { type: String },
    tarotImage1: { type: String },
    tarotName2: { type: String },
    tarotPrediction2: { type: String },
    tarotImage2: { type: String },
    tarotName3: { type: String },
    tarotPrediction3: { type: String },
    tarotImage3: { type: String },
    // 🔹 ถ้าเป็นประวัติการคำนวณราศี
    zodiacSign: { type: String },
    birthdate: { type: String },
    birthtime: { type: String },
    zodiacPrediction: { type: String }, // ✅ คำทำนายของราศี
    zodiacImage: { type: String } // ✅ รูปราศี
}, { collection: "history" });
exports.UserHistory = mongoose_1.default.model("UserHistory", UserHistorySchema);
//# sourceMappingURL=userHistory.js.map