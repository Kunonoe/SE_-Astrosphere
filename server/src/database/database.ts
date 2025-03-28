import mongoose from "mongoose";

let isConnected = false;
const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB Already Connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB Connected to:", process.env.MONGO_URL);
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;