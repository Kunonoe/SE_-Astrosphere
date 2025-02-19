const express = require("express");
const router = express.Router();
const login = require("./login");
export default ()=> {
    login(router)
    return router;
}