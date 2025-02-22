import express from "express";
import { testData, login, register, getuser, update } from "../controllers/login";

export default (router: express.Router) =>{

    router.get('/product',testData)//ดึงข้อมูลมา
    router.post('/login',login)//ส่งข้อมูลไปที่ดาต้าเบส หลังบ้าน 
    router.post('/register',register)
    router.post('/getuser',getuser)
    router.post('/update',update)

//router.put() อัปเดตข้อมูล
}
