import { receiveContent } from "../Controllers/message"; 
import express from "express";

export default (router: express.Router) => {
    router.post('/message', receiveContent);
};
