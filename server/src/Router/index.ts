import express from "express";
import login from "./login";
import logout from "./logout";
import otp from "./otp";
import message from "./message";
import zodiac from "./zodiac";
import tarot from "./tarot";
import "../SubServer/croncounttime";

const router = express.Router();

export default ()=> {
    login(router)
    logout(router)
    otp(router)
    message(router)
    zodiac(router)
    tarot(router)
    return router;
}
