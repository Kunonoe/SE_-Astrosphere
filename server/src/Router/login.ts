import express,{Request , Response} from "express";
import { getdata, login } from "../Controllers/login";

export default (router: express.Router) =>{

router.get('/product',getdata)//ดึงข้อมูลมา
router.post('/login',login)//ส่งข้อมูลไปที่ดาต้าเบส หลังบ้าน 
//router.put() อัปเดตข้อมูล
}
