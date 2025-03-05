import mongoose from "mongoose";

// ✅ Schema สำหรับบันทึกประวัติการใช้งานของผู้ใช้
const UserHistorySchema = new mongoose.Schema({
    userID: { type: String, required: true },
    type: { type: String, enum: ["tarot", "zodiac"], required: true }, // tarot = สุ่มไพ่, zodiac = คำนวณราศี
    timestamp: { type: Date, default: Date.now },
    
    // 🔹 ถ้าเป็นประวัติสุ่มไพ่ทาโรต์
    drawnCards: [{ cardName: String, cardMeaning: String, cardImage: String }],

    // 🔹 ถ้าเป็นประวัติการคำนวณราศี
    zodiacSign: { type: String }, 
    birthdate: { type: String },
    birthtime: { type: String }
    
}, { collection: "history" });

export const UserHistory = mongoose.model("UserHistory", UserHistorySchema);
