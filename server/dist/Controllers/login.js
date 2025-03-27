"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showUsers = exports.register = exports.login = void 0;
const login_1 = require("../models/login");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth_config"));
const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ status: "error", message: "Username and password are required" });
        }
        // ค้นหาผู้ใช้จากฐานข้อมูล
        const user = await login_1.Account.findOne({ username: name });
        if (!user) {
            return res.status(400).json({ status: "error", message: "User not found" });
        }
        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "Incorrect password" });
        }
        // ตรวจสอบว่า JWT_SECRET ถูกกำหนดและเป็น string
        if (!auth_config_1.default.JWT_SECRET || typeof auth_config_1.default.JWT_SECRET !== "string") {
            throw new Error("JWT_SECRET is not set or is invalid");
        }
        // กำหนด expiresIn ให้ถูกต้องตามประเภทที่ jwt.sign รองรับ
        let expiresIn;
        if (typeof auth_config_1.default.TOKEN_EXPIRATION === "number") {
            expiresIn = auth_config_1.default.TOKEN_EXPIRATION;
        }
        else if (typeof auth_config_1.default.TOKEN_EXPIRATION === "string") {
            expiresIn = parseInt(auth_config_1.default.TOKEN_EXPIRATION, 10);
            if (isNaN(expiresIn)) {
                expiresIn = "1h"; // หาก parsing ล้มเหลว ใช้ค่า default
            }
        }
        else {
            expiresIn = "1h"; // ค่า default
        }
        // สร้าง JWT Token อย่างถูกต้อง
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString(), username: user.username }, auth_config_1.default.JWT_SECRET, // ต้องเป็น string เท่านั้น
        { expiresIn } // ใช้ค่าที่กำหนดไว้อย่างถูกต้อง
        );
        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            user: {
                id: user._id.toString(),
                username: user.username,
                email: user.email, // ส่งข้อมูล user ไปให้ frontend
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        let { username, firstname, lastname, email, password, confirmpassword, birthday } = req.body;
        //  ตรวจสอบข้อมูลที่จำเป็น
        if (!username || !email || !password || !confirmpassword) {
            return res.status(400).json({ status: "error", message: "Username, Email, Password, and Confirm Password are required" });
        }
        //  ตรวจสอบความยาวของรหัสผ่าน
        if (password.length < 6) {
            return res.status(400).json({ status: "error", message: "Password must be at least 6 characters long" });
        }
        //  ตรวจสอบว่ารหัสผ่านตรงกัน
        if (password !== confirmpassword) {
            return res.status(400).json({ status: "error", message: "Passwords do not match" });
        }
        // แปลงอีเมลเป็นตัวพิมพ์เล็กและตัดช่องว่าง
        email = email.toLowerCase().trim();
        //  ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
        const existingUser = await login_1.Account.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "Username or Email already exists"
            });
        }
        //  Hash password
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        //  ตั้งค่าวันเกิดเริ่มต้นหากไม่ได้ระบุไว้
        if (!birthday) {
            birthday = "2000-01-01"; // Set a more realistic default
        }
        //  สร้างผู้ใช้ใหม่
        const newUser = new login_1.Account({
            username,
            firstname: firstname?.trim() || "",
            lastname: lastname?.trim() || "",
            email,
            password: hashedPassword,
            birthday,
        });
        await newUser.save();
        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            user: {
                _id: newUser._id, // รวม ID ผู้ใช้สำหรับการใช้งานส่วนหน้า
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
const showUsers = async (req, res) => {
    try {
        // ดึงเฉพาะ username จากฐานข้อมูล
        const users = await login_1.Account.find({}, "username");
        return res.send({
            status: "success",
            users: users.map(user => user.username)
        });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.showUsers = showUsers;
//# sourceMappingURL=login.js.map