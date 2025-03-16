import express from "express";
import {login, register, deleteAccount, showUsers, updateProfile, resetPassword  } from "../Controllers/login";
import {requestOTP , updatePassword}from "../Controllers/otp";
import { googleLogin } from "../Controllers/login";

export default (router: express.Router) => {
    router.get('/product',showUsers)//ดึงข้อมูลมา
    router.post('/login',login)
    router.post('/register',register)
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