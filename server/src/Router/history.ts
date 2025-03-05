import { Router } from "express";
import { getUserHistory } from "../controllers/history";

export default (router: Router) => {
    // ✅ API ดูประวัติการใช้งานของผู้ใช้
    router.get('/history/:userID', getUserHistory);

    return router;
};
