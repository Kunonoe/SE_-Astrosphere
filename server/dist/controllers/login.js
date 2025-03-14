"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.updateProfile = exports.googleLogin = exports.deleteAccount = exports.updateOTP = exports.register = exports.login = exports.showUsers = void 0;
const login_1 = require("../models/login");
const bcrypt_1 = __importDefault(require("bcrypt"));
const firebaseAdmin_1 = __importDefault(require("../database/firebaseAdmin")); // ✅ ใช้ Firebase Admin SDK
const showUsers = async (req, res) => {
    try {
        // ดึงเฉพาะ username จากฐานข้อมูล
        const users = await login_1.Account.find({}, "username");
        return res.send({
            status: "success",
            users: users.map(user => user.username) // ส่งเฉพาะชื่อออกไป
        });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.showUsers = showUsers;
const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        // ค้นหาผู้ใช้จากฐานข้อมูล
        const user = await login_1.Account.findOne({ username: name });
        console.log("Input password:", password);
        console.log("Stored hashed password:", user.password);
        if (!user) {
            return res.status(400).send({ status: "error", message: "User not found" });
        }
        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ status: "error", message: "Incorrect password" });
        }
        return res.send({
            status: "success",
            message: "Login successful"
        });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        let { name, firstname, lastname, email, password, confirmpassword, birthday } = req.body;
        // ✅ ตรวจสอบว่าข้อมูลที่จำเป็นถูกส่งมาครบถ้วน
        if (!name || !email || !password || !confirmpassword) {
            return res.status(400).json({ status: "error", message: "Name, Email, Password, and Confirm Password are required" });
        }
        // ✅ ตรวจสอบว่ารหัสผ่านกับยืนยันรหัสผ่านตรงกันหรือไม่
        if (password !== confirmpassword) {
            return res.status(400).json({ status: "error", message: "Passwords do not match" });
        }
        // ✅ แปลง email เป็น lowercase ป้องกันปัญหาการสมัครซ้ำเนื่องจากตัวพิมพ์
        email = email.toLowerCase();
        // ✅ ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
        const existingUser = await login_1.Account.findOne({
            $or: [{ username: name }, { email: email }]
        });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "Username or Email already exists"
            });
        }
        // ✅ เข้ารหัสรหัสผ่านก่อนบันทึก
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // ✅ สร้างบัญชีใหม่ และบันทึกลง MongoDB
        const newUser = new login_1.Account({
            username: name,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            birthday: birthday,
        });
        await newUser.save();
        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            user: {
                username: newUser.username,
                email: newUser.email
            }
        });
    }
    catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
exports.register = register;
const updateOTP = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmPassword } = req.body;
        if (!email || !otp || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }
        // ✅ ตรวจสอบ OTP
        const validOTP = await otp.findOne({ email, otp }).lean();
        if (!validOTP)
            return res.status(400).json({ error: "OTP ไม่ถูกต้อง" });
        // ✅ ตรวจสอบรหัสผ่านใหม่
        if (newPassword !== confirmPassword)
            return res.status(400).json({ error: "รหัสผ่านไม่ตรงกัน" });
        // ✅ เข้ารหัสรหัสผ่านใหม่
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        // ✅ อัปเดตรหัสผ่าน
        await login_1.Account.updateOne({ email }, { $set: { password: hashedPassword } });
        // ✅ ลบ OTP
        await otp.deleteOne({ email, otp });
        return res.status(200).json({ message: "รีเซ็ตรหัสผ่านสำเร็จ" });
    }
    catch (error) {
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน" });
    }
};
exports.updateOTP = updateOTP;
const deleteAccount = async (req, res) => {
    try {
        const { userId } = req.body;
        // ✅ ตรวจสอบว่ามี `userId` ถูกส่งมา
        if (!userId) {
            return res.status(400).json({ status: "error", message: "User ID is required" });
        }
        // ✅ ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await login_1.Account.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        // ✅ ลบข้อมูลผู้ใช้
        await login_1.Account.findByIdAndDelete(userId);
        return res.status(200).json({
            status: "success",
            message: "Account deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
exports.deleteAccount = deleteAccount;
// ฟังก์ชันสำหรับ Google Login
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token)
            return res.status(400).json({ message: "Token is required" });
        // 🔹 ตรวจสอบ Token ผ่าน Firebase Admin SDK
        const decodedToken = await firebaseAdmin_1.default.auth().verifyIdToken(token);
        console.log("✅ Decoded Token:", decodedToken);
        return res.status(200).json({
            message: "Login Successful",
            user: {
                uid: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name || "",
                photo: decodedToken.picture || "",
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Authentication Failed", error: error.message });
    }
};
exports.googleLogin = googleLogin;
const updateProfile = async (req, res) => {
    try {
        const { userId, username, firstname, lastname, birthday } = req.body;
        // ✅ ตรวจสอบว่ามี `userId` ที่จะอัปเดต
        if (!userId) {
            return res.status(400).json({ status: "error", message: "User ID is required" });
        }
        // ✅ ตรวจสอบว่าผู้ใช้มีอยู่จริงหรือไม่
        const user = await login_1.Account.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        // ✅ ตรวจสอบว่า `username` ซ้ำกับคนอื่นหรือไม่
        if (username && username !== user.username) {
            const existingUser = await login_1.Account.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ status: "error", message: "Username already taken" });
            }
        }
        // ✅ อัปเดตข้อมูล
        user.username = username || user.username;
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.birthday = birthday || user.birthday;
        // ✅ บันทึกข้อมูลลง MongoDB
        await user.save();
        return res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
            user: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                birthday: user.birthday
            }
        });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
exports.updateProfile = updateProfile;
const resetPassword = async (req, res) => {
    try {
        const { userId, password, confirmPassword } = req.body;
        // ✅ ตรวจสอบว่าข้อมูลครบถ้วน
        if (!userId || !password || !confirmPassword) {
            return res.status(400).json({ status: "error", message: "User ID, New Password, and Confirm Password are required" });
        }
        // ✅ ตรวจสอบว่ารหัสผ่านกับยืนยันรหัสผ่านตรงกัน
        if (password !== confirmPassword) {
            return res.status(400).json({ status: "error", message: "Passwords do not match" });
        }
        // ✅ ตรวจสอบว่าผู้ใช้มีอยู่จริง
        const user = await login_1.Account.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        // ✅ เข้ารหัสรหัสผ่านใหม่ก่อนบันทึก
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // ✅ บันทึกรหัสผ่านใหม่ลง MongoDB
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            status: "success",
            message: "Password reset successfully"
        });
    }
    catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=login.js.map