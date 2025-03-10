import { receiveContent } from "../controllers/message"; // ฟังก์ชันบันทึกข้อความ
import { sendScheduledMessages } from "../SubServer/sendmessages"; // ฟังก์ชันส่งข้อความ
import express from "express";

export default (router: express.Router) => {
    // API สำหรับบันทึกข้อความลง MongoDB
    router.post('/message', receiveContent);
};
