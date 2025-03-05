import { Router } from "express";
import { createReview, getZodiacReviews, getTarotReviews, updateReview, deleteReview, getAllReviews, getUserReviews } from "../controllers/review";

export default (router: Router) => {
    router.get('/history/:userID',getUserReviews);//ดูประวัติ
    router.post('/reviews', createReview);//เขียนรีวิว
    router.get('/reviews/all',getAllReviews);//ดูรีวิวทั้งหมด
    router.get('/reviews/zodiac/:zodiacSign', getZodiacReviews);
    router.get('/reviews/tarot/:tarotCard', getTarotReviews);
    router.put('/reviews/update/:reviewID', updateReview); //แก้ไขรีวิวตัวเอง
    router.delete('/reviews/delete/:reviewID', deleteReview);

    return router;
};
