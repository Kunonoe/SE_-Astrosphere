import express from "express";
import login from "../router/login";
import otp from "./otp";
import message from "../router/message";




const router = express.Router();

export default ()=> {
    login(router)
    otp(router)
    message(router)
    return router;
}
