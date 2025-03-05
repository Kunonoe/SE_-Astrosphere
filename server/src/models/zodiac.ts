import mongoose from "mongoose";
const ZodiacSchema = new mongoose.Schema({
    cardID: Number,
    cardNAME: String,
    cardMEANING: String,
    cardPHOTO: String
}, { collection: "zodiac_cards" }); // ✅ เชื่อมกับ Collection `zodiac_cards`

console.log("✅ ใช้ Collection: zodiac_cards");
export const Zodiac = mongoose.model("Zodiac", ZodiacSchema);
