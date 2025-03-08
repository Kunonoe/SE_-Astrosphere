import express from "express";
import { logout } from "../controllers/logout"; // นำเข้า Controller ที่สร้างไว้

export default (router: express.Router) => {
    router.post("/logout", logout);
    
}

