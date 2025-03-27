"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = async (req, res) => {
    try {
        //  ลบ Token (JWT) ออกจาก Client
        res.clearCookie("token"); // ใช้ถ้าคุณเก็บ JWT ไว้ใน Cookie
        return res.status(200).json({ status: "success", message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
exports.logout = logout;
//# sourceMappingURL=logout.js.map