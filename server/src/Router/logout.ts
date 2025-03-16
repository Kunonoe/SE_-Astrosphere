import express from "express";
import { logout } from "../Controllers/logout"; // นำเข้า Controller ที่สร้างไว้

export default (router: express.Router) => {
    router.post("/logout", logout);
    
}

