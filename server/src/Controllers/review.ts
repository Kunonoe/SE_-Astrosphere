import { Request, Response } from "express";
import { Review } from "../models/review";

// ✅ API เขียนรีวิว (ราศี หรือ ไพ่ทาโรต์)
export const createReview = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userID, zodiacSign, tarotCard, reviewText} = req.body;

        if (!userID || !reviewText || (!zodiacSign && !tarotCard)) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        console.log(`✅ บันทึกรีวิวของ ${zodiacSign || tarotCard} โดย User: ${userID}`);

        const newReview = await Review.create({ userID, zodiacSign, tarotCard, reviewText});

        return res.status(201).json({ message: "รีวิวถูกบันทึกเรียบร้อย", review: newReview });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการบันทึกรีวิว", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
// ✅ API ดูรีวิวทั้งหมด (ทั้งราศี & ไพ่)
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find().sort({ timestamp: -1 }).lean();

        if (reviews.length === 0) {
            return res.status(404).json({ error: "ไม่พบรีวิวในระบบ" });
        }

        // ✅ แยกรีวิวเป็น 2 กลุ่ม (ราศี กับ ไพ่ทาโรต์)
        const zodiacReviews = reviews.filter(r => r.zodiacSign);
        const tarotReviews = reviews.filter(r => r.tarotCard);

        return res.json({
            totalReviews: reviews.length,
            zodiacReviews,
            tarotReviews
        });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงรีวิวทั้งหมด", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};

// ✅ API ดูรีวิวของราศี
export const getZodiacReviews = async (req: Request, res: Response) => {
    const { zodiacSign } = req.params;

    try {
        const reviews = await Review.find({ zodiacSign }).sort({ timestamp: -1 }).lean();

        if (reviews.length === 0) {
            return res.status(404).json({ error: `ไม่พบรีวิวสำหรับราศี ${zodiacSign}` });
        }

        return res.json({ zodiacSign, reviews });
    } catch (error) {
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงรีวิว" });
    }
};

// ✅ API ดูรีวิวของไพ่ทาโรต์
export const getTarotReviews = async (req: Request, res: Response) => {
    const { tarotCard } = req.params;

    try {
        const reviews = await Review.find({ tarotCard }).sort({ timestamp: -1 }).lean();

        if (reviews.length === 0) {
            return res.status(404).json({ error: `ไม่พบรีวิวสำหรับไพ่ ${tarotCard}` });
        }

        return res.json({ tarotCard, reviews });
    } catch (error) {
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงรีวิว" });
    }
};

// ✅ API แก้ไขรีวิว
export const updateReview = async (req: Request, res: Response) => {
    const { reviewID } = req.params;
    const { userID, reviewText, rating } = req.body;

    if (!userID || !reviewText || !rating) {
        return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    try {
        const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewID, userID },  
            { reviewText, rating },
            { new: true }
        ).lean();

        if (!updatedReview) {
            return res.status(404).json({ error: "ไม่พบรีวิวของคุณ หรือคุณไม่มีสิทธิ์แก้ไข" });
        }

        return res.json({ message: "รีวิวถูกอัปเดตเรียบร้อย", review: updatedReview });
    } catch (error) {
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตรีวิว" });
    }
};
// ✅ API ลบรีวิว
export const deleteReview = async (req: Request, res: Response) => {
    const { reviewID } = req.params;
    const { userID } = req.body;

    try {
        const deletedReview = await Review.findOneAndDelete({ _id: reviewID, userID }).lean();

        if (!deletedReview) {
            return res.status(404).json({ error: "ไม่พบรีวิวของคุณ หรือคุณไม่มีสิทธิ์ลบ" });
        }

        return res.json({ message: "รีวิวถูกลบเรียบร้อย" });
    } catch (error) {
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบรีวิว" });
    }
};
// ✅ API ดูประวัติรีวิวของผู้ใช้
export const getUserReviews = async (req: Request, res: Response) => {
    const { userID } = req.params;

    if (!userID) {
        return res.status(400).json({ error: "กรุณาระบุ userID" });
    }

    try {
        const reviews = await Review.find({ userID }).sort({ timestamp: -1 }).lean();

        if (reviews.length === 0) {
            return res.status(404).json({ error: `ไม่พบรีวิวของผู้ใช้ ${userID}` });
        }

        // ✅ แยกรีวิวเป็น 2 กลุ่ม (ราศี กับ ไพ่ทาโรต์)
        const zodiacReviews = reviews.filter(r => r.zodiacSign);
        const tarotReviews = reviews.filter(r => r.tarotCard);

        return res.json({
            userID,
            totalReviews: reviews.length,
            zodiacReviews,
            tarotReviews
        });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงประวัติรีวิว", error);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
