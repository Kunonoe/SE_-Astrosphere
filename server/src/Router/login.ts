import express from "express";
import {login, register, updateOTP, deleteAccount, showUsers, updateProfile, resetPassword  } from "../controllers/login";
import {requestOTP , updatePassword}from "../controllers/otp";
//import otpRouter from "./otp";  // แก้จาก otp เป็น otpRouter
import { googleLogin } from "../controllers/login";

export default (router: express.Router) => {
    router.get('/product',showUsers)//ดึงข้อมูลมา
    router.post('/login',login)//ส่งข้อมูลไปที่ดาต้าเบส หลังบ้าน 
    router.post('/register',register)
    router.post('/update',updateOTP)
    router.delete('/deleteID',deleteAccount)
    router.post('/updateprofile',updateProfile)
    router.post('/reset',resetPassword)
    //router.put() อัปเดตข้อมูล
    
    // 📌 เพิ่ม API สำหรับ OTP โดยตรงที่ index.ts
    router.post("/request-otp",requestOTP);  // ✅ ใช้ requestOTP
    router.post("/update-password",updatePassword);  // ✅ ใช้ updatePassword

    // 🔹 API สำหรับ Login ผ่าน Google
    router.post("/google", googleLogin);

}