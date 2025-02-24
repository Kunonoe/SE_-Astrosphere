import express from "express";
import {login, register, getuser, update, deleteID, showUsers  } from "../controllers/login";
import {requestOTP , updatePassword}from "../controllers/otp";
import otpRouter from "../router/otp";  // แก้จาก otp เป็น otpRouter

// const router = express.Router();

//     router.get('/product',showUsers)//ดึงข้อมูลมา
//     router.post('/login',login)//ส่งข้อมูลไปที่ดาต้าเบส หลังบ้าน 
//     router.post('/register',register)
//     router.post('/getuser',getuser)
//     router.post('/update',update)
//     router.post('/deleteID',deleteID)

    
//     //router.use("/otp", otpRouter );     // ✅ เส้นทางของ OTP
//     //router.put() อัปเดตข้อมูล
    
//     // 📌 เพิ่ม API สำหรับ OTP โดยตรงที่ index.ts
//     router.post("/request-otp", requestOTP);  // ✅ ใช้ requestOTP
//     router.post("/update-password", updatePassword);  // ✅ ใช้ updatePassword

// export default router;  // ✅ ส่งออก router หลัก

export default (router: express.Router) => {
    router.get('/product',showUsers)//ดึงข้อมูลมา
    router.post('/login',login)//ส่งข้อมูลไปที่ดาต้าเบส หลังบ้าน 
    router.post('/register',register)
    router.post('/getuser',getuser)
    router.post('/update',update)
    router.post('/deleteID',deleteID)

    //router.put() อัปเดตข้อมูล
    
    // 📌 เพิ่ม API สำหรับ OTP โดยตรงที่ index.ts
    router.post("/request-otp",requestOTP);  // ✅ ใช้ requestOTP
    router.post("/update-password",updatePassword);  // ✅ ใช้ updatePassword

}