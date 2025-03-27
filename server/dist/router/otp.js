"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const otp_1 = require("../Controllers/otp");
exports.default = (router) => {
    // ส่ง OTP ไปยังอีเมลของผู้ใช้
    router.post("/request-otp", otp_1.requestOTP); //ขอ OTP
    // อัปเดตรหัสผ่านโดยใช้ OTP
    router.post("/update-password", otp_1.updatePassword);
};
//# sourceMappingURL=otp.js.map