import express from "express";

export const logout = async (req: express.Request, res: express.Response) => {
    try {
        // ✅ ลบ Token (JWT) ออกจาก Client
        res.clearCookie("token"); // ใช้ถ้าคุณเก็บ JWT ไว้ใน Cookie
        return res.status(200).json({ status: "success", message: "Logged out successfully" });

    } catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
