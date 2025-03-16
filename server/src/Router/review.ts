import { Router } from "express";
import { createReview, updateReview, deleteReview, getAllReviews, getUserReviewHistory } from "../Controllers/review";

export default (router: Router) => {
    router.post('/reviews', createReview);//เขียนรีวิว
    router.get('/reviews/history/:userID',getUserReviewHistory);//ดูประวัติ

    router.get('/reviews/all',getAllReviews);//ดูรีวิวทั้งหมด

    router.post('/reviews/update', updateReview); //แก้ไขรีวิวตัวเอง
    router.delete('/reviews/delete', deleteReview);

    return router;
};
