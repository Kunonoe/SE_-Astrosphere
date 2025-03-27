"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.requestOTP = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const login_1 = require("../models/login"); // โมเดล Account
const sendOTP_1 = require("../utils/sendOTP"); // ฟังก์ชันส่ง OTP
const otpStore = new Map(); // เก็บ OTP ชั่วคราว
// 📌 ฟังก์ชันส่ง OTP ไปยังอีเมล
const requestOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await login_1.Account.findOne({ email });
        if (!user) {
            return res.status(400).send({ status: "error", message: "User not found" });
        }
        // สร้าง OTP 6 หลัก
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(email, otp);
        // ส่ง OTP ไปที่อีเมล
        const isSent = await (0, sendOTP_1.sendOTP)(email, Number(otp));
        if (!isSent) {
            return res.status(500).send({ status: "error", message: "Failed to send OTP" });
        }
        return res.send({ status: "success", message: "OTP sent successfully" });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.requestOTP = requestOTP;
// 📌 ฟังก์ชันอัปเดตรหัสผ่านหลังจากตรวจสอบ OTP
const updatePassword = async (req, res) => {
    try {
        const { email, newpassword, otp } = req.body;
        // ตรวจสอบ OTP
        const storedOtp = otpStore.get(email);
        if (!storedOtp || storedOtp !== otp) {
            return res.status(400).send({ status: "error", message: "Invalid OTP" });
        }
        // ลบ OTP หลังจากใช้แล้ว
        otpStore.delete(email);
        // ค้นหาผู้ใช้
        const user = await login_1.Account.findOne({ email });
        if (!user) {
            return res.status(400).send({ status: "error", message: "User not found" });
        }
        // เข้ารหัสรหัสผ่านใหม่
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newpassword, salt);
        // อัปเดตรหัสผ่าน
        await login_1.Account.updateOne({ email }, { $set: { password: hashedPassword } });
        return res.send({ status: "success", message: "Password updated successfully" });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=otp.js.map