import express from "express";
import {login, register,  showUsers,  resetPassword  } from "../Controllers/login";
import {requestOTP , updatePassword}from "../Controllers/otp";

export default (router: express.Router) => {
    router.get('/showuser',showUsers)//ดึงข้อมูลมา
    router.post('/login',login)
    router.post('/register',register)
    router.post('/reset',resetPassword)
    //router.put() อัปเดตข้อมูล
    
    // 📌 เพิ่ม API สำหรับ OTP โดยตรงที่ index.ts
    router.post("/request-otp",requestOTP);  //  ใช้ requestOTP
    router.post("/update-password",updatePassword);  //  ใช้ updatePassword


}