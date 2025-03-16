import { Request, Response, Router } from "express";
import { calculateZodiacAndSave } from "../Controllers/zodiac";

export default (router: Router) => {
    router.post('/calculate', calculateZodiacAndSave);

    return router;
};