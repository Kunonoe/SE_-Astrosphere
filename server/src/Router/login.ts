import express from "express";
import {login, register,  showUsers } from "../Controllers/login";


export default (router: express.Router) => {
    router.get('/showuser',showUsers)//ดึงข้อมูลมา
    router.post('/login',login)
    router.post('/register',register)
    //router.put() อัปเดตข้อมูล
 
}