import express from "express";
import { requestOTP, updatePassword } from "../Controllers/otp";

export default (router: express.Router) => {
    
// ส่ง OTP ไปยังอีเมลของผู้ใช้
router.post("/request-otp",requestOTP); //ขอ OTP

// อัปเดตรหัสผ่านโดยใช้ OTP
router.post("/update-password",updatePassword); 

}