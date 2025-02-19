import express from "express";
import { testData, login } from "../controllers/login";

export default (router: express.Router) =>{

    router.get('/product',testData)//ดึงข้อมูลมา
    router.post('/login',login)//ส่งข้อมูลไปที่ดาต้าเบส หลังบ้าน 
//router.put() อัปเดตข้อมูล
}
