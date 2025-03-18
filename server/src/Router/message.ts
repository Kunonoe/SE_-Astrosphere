import { receiveContent } from "../Controllers/message"; // ฟังก์ชันบันทึกข้อความ
import express from "express";

export default (router: express.Router) => {
    // API สำหรับบันทึกข้อความลง MongoDB
    router.post('/message', receiveContent);
};
