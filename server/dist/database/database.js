"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB Connected to:", process.env.MONGO_URL);
        // ทดสอบว่ามีข้อมูลราศีอยู่ใน Database หรือไม่
        const allZodiacs = await mongoose_1.default.connection.db.collection("zodiac_cards").find().toArray();
        console.log("🔍 ข้อมูลราศีที่มีอยู่ใน MongoDB:", allZodiacs);
    }
    catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
//# sourceMappingURL=database.js.map