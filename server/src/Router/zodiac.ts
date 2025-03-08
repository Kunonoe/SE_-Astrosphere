import { Request, Response, Router } from "express";
import { calculateZodiacAndSave } from "../controllers/zodiac";

export default (router: Router) => {
    router.post('/calculate', calculateZodiacAndSave);

    return router;
};