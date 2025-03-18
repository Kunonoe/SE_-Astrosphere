import { Router } from "express";
import {  ListTarot, getTarotByID } from "../Controllers/tarot"; 

export default (router: Router) => {
    router.get('/tarotall', ListTarot);
    router.get("/gettarot/:id", getTarotByID);

    return router;
};