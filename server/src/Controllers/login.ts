import express from "express";
import { Account } from "../models/login";
import bcrypt from "bcrypt";
import { Request, Response } from "express";  // ✅ ต้อง import จาก express
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/auth_config";

export const showUsers = async (req: express.Request, res: express.Response) => {
    try {
        // ดึงเฉพาะ username จากฐานข้อมูล
        const users = await Account.find({}, "username");

        return res.send({
            status: "success",
            users: users.map(user => user.username) // ส่งเฉพาะชื่อออกไป
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

interface LoginRequestBody {
    name: string;
    password: string;
}

interface LoginResponseBody {
    status: string;
    message: string;
    token?: string;
    user?: {
        id: string;
        username: string;
        email?: string;
    };
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response<LoginResponseBody>) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ status: "error", message: "Username and password are required" });
        }

        // ค้นหาผู้ใช้จากฐานข้อมูล
        const user = await Account.findOne({ username: name });
        if (!user) {
            return res.status(400).json({ status: "error", message: "User not found" });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "Incorrect password" });
        }

        // ตรวจสอบว่า JWT_SECRET ถูกกำหนดและเป็น string
        if (!config.JWT_SECRET || typeof config.JWT_SECRET !== "string") {
            throw new Error("JWT_SECRET is not set or is invalid");
        }

        // กำหนด expiresIn ให้ถูกต้องตามประเภทที่ jwt.sign รองรับ
        let expiresIn: SignOptions["expiresIn"];
        if (typeof config.TOKEN_EXPIRATION === "number") {
            expiresIn = config.TOKEN_EXPIRATION;
        } else if (typeof config.TOKEN_EXPIRATION === "string") {
            expiresIn = parseInt(config.TOKEN_EXPIRATION, 10);
            if (isNaN(expiresIn)) {
                expiresIn = "1h"; // หาก parsing ล้มเหลว ใช้ค่า default
            }
        } else {
            expiresIn = "1h"; // ค่า default
        }

        // สร้าง JWT Token อย่างถูกต้อง
        const token: string = jwt.sign(
            { userId: user._id.toString(), username: user.username },
            config.JWT_SECRET, // ต้องเป็น string เท่านั้น
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
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        let { username, firstname, lastname, email, password, confirmpassword, birthday } = req.body;

        // ✅ Validate required fields
        if (!username || !email || !password || !confirmpassword) {
            return res.status(400).json({ status: "error", message: "Username, Email, Password, and Confirm Password are required" });
        }

        // ✅ Validate password length
        if (password.length < 6) {
            return res.status(400).json({ status: "error", message: "Password must be at least 6 characters long" });
        }

        // ✅ Ensure passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ status: "error", message: "Passwords do not match" });
        }

        // ✅ Convert email to lowercase and trim spaces
        email = email.toLowerCase().trim();

        // ✅ Check if the user already exists
        const existingUser = await Account.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "Username or Email already exists"
            });
        }

        // ✅ Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Set default birthday if not provided
        if (!birthday) {
            birthday = "2000-01-01"; // Set a more realistic default
        }

        // ✅ Create new user
        const newUser = new Account({
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
                _id: newUser._id,  // Include user ID for frontend usage
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
export const deleteAccount = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.body;

        // ✅ ตรวจสอบว่ามี `userId` ถูกส่งมา
        if (!userId) {
            return res.status(400).json({ status: "error", message: "User ID is required" });
        }

        // ✅ ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await Account.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // ✅ ลบข้อมูลผู้ใช้
        await Account.findByIdAndDelete(userId);

        return res.status(200).json({
            status: "success",
            message: "Account deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

export const updateProfile = async (req: express.Request, res: express.Response) => {
    try {
        const { userId, username, firstname, lastname, birthday } = req.body;

        // ✅ ตรวจสอบว่ามี `userId` ที่จะอัปเดต
        if (!userId) {
            return res.status(400).json({ status: "error", message: "User ID is required" });
        }

        // ✅ ตรวจสอบว่าผู้ใช้มีอยู่จริงหรือไม่
        const user = await Account.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // ✅ ตรวจสอบว่า `username` ซ้ำกับคนอื่นหรือไม่
        if (username && username !== user.username) {
            const existingUser = await Account.findOne({ username });
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

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
export const resetPassword = async (req: express.Request, res: express.Response) => {
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
        const user = await Account.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // ✅ เข้ารหัสรหัสผ่านใหม่ก่อนบันทึก
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ บันทึกรหัสผ่านใหม่ลง MongoDB
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            status: "success",
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
