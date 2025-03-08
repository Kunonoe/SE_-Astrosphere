import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },  // ✅ เปลี่ยนเป็น ObjectId
    username: { type: String, required: true },
    cardID: { type: mongoose.Schema.Types.ObjectId, required: true },  // ✅ ใช้ ObjectId แทน Number
    cardType: { type: String, enum: ["zodiac", "tarot"], required: true },
    cardName: { type: String, required: true },
    cardImage: { type: String, required: true },
    userPrediction: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { collection: "reviews" });

export const Review = mongoose.model("Review", ReviewSchema);
