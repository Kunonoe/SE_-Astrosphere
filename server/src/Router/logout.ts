import express from "express";
import { logout } from "../Controllers/logout"; 

export default (router: express.Router) => {
    router.post("/logout", logout);
    
}

