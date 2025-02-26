import express from "express";
import login from "../Router/login";
import otp from "./otp";
import message from "../Router/message";




const router = express.Router();

export default ()=> {
    login(router)
    otp(router)
    message(router)
    return router;
}
