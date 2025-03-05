import mongoose from "mongoose";
const TarotSchema = new mongoose.Schema({
    cardID: Number,
    cardNAME: String,
    cardMEANING: String,
    cardPHOTO: String
}, { collection: "tarot_cards" }); // ✅ เชื่อมกับ Collection `zodiac_cards`

console.log("✅ ใช้ Collection: zodiac_cards");
export const Tarot = mongoose.model("Tarot", TarotSchema);
