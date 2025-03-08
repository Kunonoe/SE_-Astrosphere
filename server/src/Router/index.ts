import express from "express";
import login from "./login";
import logout from "./logout";
import otp from "./otp";
import message from "./message";
import zodiac from "./zodiac";
import tarot from "./tarot";
import review from "./review";
import history from "./history";



const router = express.Router();

export default ()=> {
    login(router)
    logout(router)
    otp(router)
    message(router)
    zodiac(router)
    tarot(router)
    review(router)
    history(router)
    return router;
}
