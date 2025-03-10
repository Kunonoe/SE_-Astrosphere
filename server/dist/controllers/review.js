"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserReviewHistory = exports.deleteReview = exports.updateReview = exports.getAllReviews = exports.createReview = void 0;
const review_1 = require("../models/review");
const login_1 = require("../models/login"); // ✅ นำเข้าข้อมูลบัญชีผู้ใช้
const userHistory_1 = require("../models/userHistory"); // ✅ ใช้ history เป็นตัวอ้างอิง
const mongoose_1 = __importDefault(require("mongoose"));
const createReview = async (req, res) => {
    try {
        const { userID, historyID, userPrediction } = req.body;
        if (!userID || !historyID || !userPrediction) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }
        // ✅ ตรวจสอบว่า `historyID` เป็น ObjectId ที่ถูกต้อง
        if (!mongoose_1.default.Types.ObjectId.isValid(historyID)) {
            return res.status(400).json({ error: "historyID ไม่ถูกต้อง" });
        }
        // ✅ แปลง `historyID` เป็น `ObjectId`
        const historyObjectId = new mongoose_1.default.Types.ObjectId(historyID);
        // ✅ ดึงข้อมูลผู้ใช้จาก MongoDB
        const user = await login_1.Account.findById(userID).lean();
        if (!user) {
            return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้" });
        }
        // ✅ ดึงข้อมูลจาก `history`
        const historyData = await userHistory_1.UserHistory.findById(historyObjectId).lean();
        if (!historyData) {
            return res.status(404).json({ error: "ไม่พบข้อมูลประวัติการใช้งาน" });
        }
        let cardType, cardName, cardImage;
        if (historyData.type === "zodiac") {
            cardType = "zodiac";
            cardName = historyData.zodiacSign;
            cardImage = historyData.zodiacImage;
        }
        else if (historyData.type === "tarot") {
            cardType = "tarot";
            cardName = `${historyData.tarotName1}, ${historyData.tarotName2}, ${historyData.tarotName3}`;
            cardImage = [historyData.tarotImage1, historyData.tarotImage2, historyData.tarotImage3]
                .filter(img => img) // ✅ กรองค่าที่เป็น `undefined`
                .join(", "); // ✅ แปลง array → string
        }
        else {
            return res.status(400).json({ error: "ไม่สามารถดึงข้อมูลการ์ดได้" });
        }
        console.log(`✅ บันทึกรีวิวของ ${cardName} โดย User: ${user.username}`);
        // ✅ บันทึกรีวิวลง MongoDB
        const newReview = await review_1.Review.create({
            userID: new mongoose_1.default.Types.ObjectId(userID),
            username: user.username,
            cardID: historyObjectId, // ✅ ใช้ `_id` จาก `history`
            cardType,
            cardName,
            cardImage,
            userPrediction
        });
        return res.status(201).json({ message: "รีวิวถูกบันทึกเรียบร้อย", review: newReview });
    }
    catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการบันทึกรีวิว", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
exports.createReview = createReview;
// ✅ API ดูรีวิวทั้งหมด (ทั้งราศี & ไพ่)
const getAllReviews = async (req, res) => {
    try {
        // ✅ ดึงข้อมูลรีวิวทั้งหมดจาก MongoDB
        const reviews = await review_1.Review.find().sort({ timestamp: -1 }).lean();
        if (reviews.length === 0) {
            return res.status(404).json({ error: "ไม่พบรีวิวในระบบ" });
        }
        return res.json({
            totalReviews: reviews.length,
            reviews
        });
    }
    catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงรีวิวทั้งหมด", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
exports.getAllReviews = getAllReviews;
// ✅ API แก้ไขรีวิว
const updateReview = async (req, res) => {
    try {
        const { reviewID, userID, userPrediction } = req.body;
        // ✅ ตรวจสอบค่าที่รับมา
        if (!reviewID || !userID || !userPrediction) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน (reviewID, userID, userPrediction)" });
        }
        // ✅ ตรวจสอบว่า `reviewID` และ `userID` เป็น ObjectId ที่ถูกต้อง
        if (!mongoose_1.default.Types.ObjectId.isValid(reviewID) || !mongoose_1.default.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ error: "reviewID หรือ userID ไม่ถูกต้อง" });
        }
        // ✅ อัปเดตรีวิวโดยใช้ `_id` และ `userID`
        const updatedReview = await review_1.Review.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(reviewID), userID: new mongoose_1.default.Types.ObjectId(userID) }, { userPrediction }, { new: true }).lean();
        if (!updatedReview) {
            return res.status(404).json({ error: "ไม่พบรีวิวของคุณ หรือคุณไม่มีสิทธิ์แก้ไข" });
        }
        return res.json({ message: "รีวิวถูกอัปเดตเรียบร้อย", review: updatedReview });
    }
    catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการอัปเดตรีวิว", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตรีวิว" });
    }
};
exports.updateReview = updateReview;
// ✅ API ลบรีวิว
const deleteReview = async (req, res) => {
    try {
        const { reviewID, userID } = req.body;
        // ✅ ตรวจสอบค่าที่รับมา
        if (!reviewID || !userID) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน (reviewID, userID)" });
        }
        // ✅ ตรวจสอบว่า `reviewID` และ `userID` เป็น ObjectId ที่ถูกต้อง
        if (!mongoose_1.default.Types.ObjectId.isValid(reviewID) || !mongoose_1.default.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ error: "reviewID หรือ userID ไม่ถูกต้อง" });
        }
        // ✅ แปลง `reviewID` และ `userID` เป็น `ObjectId`
        const reviewObjectId = new mongoose_1.default.Types.ObjectId(reviewID);
        const userObjectId = new mongoose_1.default.Types.ObjectId(userID);
        // ✅ ตรวจสอบว่ามีรีวิวนี้อยู่จริงหรือไม่
        const review = await review_1.Review.findOne({ _id: reviewObjectId, userID: userObjectId }).lean();
        if (!review) {
            return res.status(404).json({ error: "ไม่พบรีวิวของคุณ หรือคุณไม่มีสิทธิ์ลบ" });
        }
        // ✅ ลบรีวิว
        await review_1.Review.deleteOne({ _id: reviewObjectId, userID: userObjectId });
        return res.json({ message: "รีวิวถูกลบเรียบร้อย" });
    }
    catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการลบรีวิว", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบรีวิว" });
    }
};
exports.deleteReview = deleteReview;
const getUserReviewHistory = async (req, res) => {
    try {
        const { userID } = req.params;
        // ✅ ตรวจสอบค่าที่รับมา
        if (!userID) {
            return res.status(400).json({ error: "กรุณาระบุ userID" });
        }
        // ✅ ตรวจสอบว่า `userID` เป็น ObjectId ที่ถูกต้อง
        if (!mongoose_1.default.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ error: "userID ไม่ถูกต้อง" });
        }
        // ✅ แปลง `userID` เป็น `ObjectId`
        const userObjectId = new mongoose_1.default.Types.ObjectId(userID);
        // ✅ ดึงรีวิวของผู้ใช้ทั้งหมด
        const reviews = await review_1.Review.find({ userID: userObjectId })
            .sort({ timestamp: -1 }) // ✅ เรียงจากใหม่ → เก่า
            .lean();
        if (reviews.length === 0) {
            return res.status(404).json({ error: "ไม่พบประวัติรีวิวของคุณ" });
        }
        return res.json({
            userID,
            totalReviews: reviews.length,
            reviews
        });
    }
    catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงประวัติรีวิว", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
exports.getUserReviewHistory = getUserReviewHistory;
//# sourceMappingURL=review.js.map