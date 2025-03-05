import { reciveContent } from "../controllers/message";
import express from "express";

export default (router: express.Router) => {
    router.post('/message',reciveContent)//ดึงข้อมูลมา
    
}