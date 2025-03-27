"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB Already Connected");
        return;
    }
    try {
        const db = await mongoose_1.default.connect(process.env.MONGO_URL);
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB Connected to:", process.env.MONGO_URL);
    }
    catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map