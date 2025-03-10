import { Router } from "express";
import { drawTarot } from "../controllers/tarot"; // ✅ Import ให้ถูกต้อง

export default (router: Router) => {
    // ✅ API สุ่มไพ่ทาโรต์ 3 ใบ
    router.get('/tarot/:userID', drawTarot);

    return router;
};
