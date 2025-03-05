import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    userID: { type: String, required: true },  
    zodiacSign: { type: String, required: false }, // ถ้าเป็นรีวิวราศี
    tarotCard: { type: String, required: false },  // ถ้าเป็นรีวิวไพ่
    reviewText: { type: String, required: true },  
    timestamp: { type: Date, default: Date.now }  
}, { collection: "reviews" }); // ✅ Collection "zodiac_reviews"

export const Review = mongoose.model("Review", ReviewSchema);
