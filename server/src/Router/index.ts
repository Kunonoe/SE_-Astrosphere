import express from "express";
import login from "./login";

const router = express.Router();

export default ()=> {
    login(router)
    return router;
}