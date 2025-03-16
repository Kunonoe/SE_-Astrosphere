import { Router } from "express";
import { drawTarot, ListTarot, getTarotByID } from "../Controllers/tarot"; // ✅ Import ให้ถูกต้อง

export default (router: Router) => {
    router.get('/tarot/:userID', drawTarot);
    router.get('/tarotall', ListTarot);
    router.get("/gettarot/:id", getTarotByID);

    return router;
};