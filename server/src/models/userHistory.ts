import mongoose from "mongoose";
import tarot from "router/tarot";

// ✅ Schema สำหรับบันทึกประวัติการใช้งานของผู้ใช้
const UserHistorySchema = new mongoose.Schema({
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

export const UserHistory = mongoose.model("UserHistory", UserHistorySchema);
