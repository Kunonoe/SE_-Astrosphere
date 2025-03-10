"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../controllers/login");
const otp_1 = require("../controllers/otp");
//import otpRouter from "./otp";  // แก้จาก otp เป็น otpRouter
const login_2 = require("../controllers/login");
exports.default = (router) => {
    router.get('/product', login_1.showUsers); //ดึงข้อมูลมา
    router.post('/login', login_1.login); //ส่งข้อมูลไปที่ดาต้าเบส หลังบ้าน 
    router.post('/register', login_1.register);
    router.post('/update', login_1.updateOTP);
    router.delete('/deleteID', login_1.deleteAccount);
    router.post('/updateprofile', login_1.updateProfile);
    router.post('/reset', login_1.resetPassword);
    //router.put() อัปเดตข้อมูล
    // 📌 เพิ่ม API สำหรับ OTP โดยตรงที่ index.ts
    router.post("/request-otp", otp_1.requestOTP); // ✅ ใช้ requestOTP
    router.post("/update-password", otp_1.updatePassword); // ✅ ใช้ updatePassword
    // 🔹 API สำหรับ Login ผ่าน Google
    router.post("/google", login_2.googleLogin);
};
//# sourceMappingURL=login.js.map