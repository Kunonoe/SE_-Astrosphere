import express from "express";
import login from "./login";
import otp from "./otp";


const router = express.Router();

export default ()=> {
    login(router)
    otp(router)
    return router;
}
