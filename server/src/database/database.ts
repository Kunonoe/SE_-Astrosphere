import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB Connected to:", process.env.MONGO_URL);

        // ทดสอบว่ามีข้อมูลราศีอยู่ใน Database หรือไม่
        const allZodiacs = await mongoose.connection.db.collection("zodiac_cards").find().toArray();
        console.log("🔍 ข้อมูลราศีที่มีอยู่ใน MongoDB:", allZodiacs);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
