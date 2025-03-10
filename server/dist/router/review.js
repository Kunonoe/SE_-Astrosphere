"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = require("../controllers/review");
exports.default = (router) => {
    router.post('/reviews', review_1.createReview); //เขียนรีวิว
    router.get('/reviews/history/:userID', review_1.getUserReviewHistory); //ดูประวัติ
    router.get('/reviews/all', review_1.getAllReviews); //ดูรีวิวทั้งหมด
    router.post('/reviews/update', review_1.updateReview); //แก้ไขรีวิวตัวเอง
    router.delete('/reviews/delete', review_1.deleteReview);
    return router;
};
//# sourceMappingURL=review.js.map