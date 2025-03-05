import { Request, Response, Router } from "express";
import { calculateZodiacAndSave } from "../controllers/zodiac";

export default (router: Router) => {
    router.post('/calculate', async (req: Request, res: Response) => {
        try {
            const result = await calculateZodiacAndSave(req);
            return res.json(result);
        } catch (error: any) {
            console.error("❌ เกิดข้อผิดพลาด:", error.message);
            return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
        }
    });

    return router;
};
