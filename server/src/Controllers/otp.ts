import express from "express";
import bcrypt from "bcrypt";
import { Account } from "../models/login"; // โมเดล Account
import { sendOTP } from "../utils/sendOTP"; // ฟังก์ชันส่ง OTP

// otpStore จะเก็บทั้งรหัส OTP และเวลาที่หมดอายุ
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

//  ฟังก์ชันส่ง OTP ไปยังอีเมล
export const requestOTP = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body;
        const user = await Account.findOne({ email });
        if (!user) {
            return res.status(400).send({ status: "error", message: "User not found" });
        }

        // สร้าง OTP 6 หลัก
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ตั้งเวลาหมดอายุใน 5 นาที
        const expiresAt = Date.now() + 5 * 60 * 1000;
        otpStore.set(email, { otp, expiresAt });

        // ส่ง OTP ไปที่อีเมล
        const isSent = await sendOTP(email, Number(otp));
        if (!isSent) {
            return res.status(500).send({ status: "error", message: "Failed to send OTP" });
        }

        return res.send({ status: "success", message: "OTP sent successfully" });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

//  ฟังก์ชันอัปเดตรหัสผ่านหลังจากตรวจสอบ OTP
export const updatePassword = async (req: express.Request, res: express.Response) => {
    try {
        const { email, newpassword, otp } = req.body;

        // ตรวจสอบ OTP และเวลาหมดอายุ
        const record = otpStore.get(email);
        if (!record || record.otp !== otp) {
            return res.status(400).send({ status: "error", message: "Invalid OTP" });
        }

        if (Date.now() > record.expiresAt) {
            otpStore.delete(email);
            return res.status(400).send({ status: "error", message: "OTP has expired" });
        }

        // ลบ OTP หลังจากใช้แล้ว
        otpStore.delete(email);

        // ค้นหาผู้ใช้
        const user = await Account.findOne({ email });
        if (!user) {
            return res.status(400).send({ status: "error", message: "User not found" });
        }

        // เข้ารหัสรหัสผ่านใหม่
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        // อัปเดตรหัสผ่าน
        await Account.updateOne({ email }, { $set: { password: hashedPassword } });

        return res.send({ status: "success", message: "Password updated successfully" });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};