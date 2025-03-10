"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = void 0;
const firebaseAdmin_1 = __importDefault(require("../database/firebaseAdmin")); // ✅ ใช้ Firebase Admin SDK
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }
        // 🔹 ตรวจสอบ Token ผ่าน Firebase Admin SDK
        const decodedToken = await firebaseAdmin_1.default.auth().verifyIdToken(token);
        console.log("✅ Decoded Token:", decodedToken);
        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // สร้างหรืออัปเดตข้อมูลผู้ใช้ในฐานข้อมูล (ถ้ามี)
        const user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || "Anonymous",
            picture: decodedToken.picture || "",
        };
        console.log("✅ User Info Sent to Frontend:", user); // 🔹 Debugging log
        return res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        console.error("❌ Error verifying token:", error);
        return res.status(500).json({ message: "Authentication Failed", error: error.message });
    }
};
exports.googleLogin = googleLogin;
//# sourceMappingURL=auth.js.map