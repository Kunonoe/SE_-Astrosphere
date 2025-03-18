import express from "express";
import {login, register,  showUsers,  resetPassword  } from "../Controllers/login";


export default (router: express.Router) => {
    router.get('/showuser',showUsers)//ดึงข้อมูลมา
    router.post('/login',login)
    router.post('/register',register)
    router.post('/reset',resetPassword)
    //router.put() อัปเดตข้อมูล
 
}