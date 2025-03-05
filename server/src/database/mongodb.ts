import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/cardDB");
        console.log("✅ MongoDB Connected...");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    }
};

export default connectDB;
