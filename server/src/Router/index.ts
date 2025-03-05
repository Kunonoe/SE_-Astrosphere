import express from "express";
import login from "./login";
import otp from "./otp";
import message from "./message";
import zodiac from "./zodiac";


const router = express.Router();

export default ()=> {
    login(router)
    otp(router)
    message(router)
    zodiac(router)
    return router;
}
