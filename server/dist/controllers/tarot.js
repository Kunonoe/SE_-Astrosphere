"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawTarot = void 0;
const tarocard_1 = require("../models/tarocard");
const userHistory_1 = require("../models/userHistory");
// ✅ ฟังก์ชันสุ่มไพ่ทาโรต์ 3 ใบ
const drawTarot = async (req, res) => {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.status(400).json({ error: "กรุณาระบุ userID" });
        }
        // ดึงไพ่ทั้งหมดจาก MongoDB
        const allTarotCards = await tarocard_1.Tarot.find().lean();
        if (allTarotCards.length < 3) {
            return res.status(400).json({ error: "ไพ่ไม่เพียงพอสำหรับการสุ่ม" });
        }
        // **สุ่มไพ่ 3 ใบ ไม่ซ้ำกัน**
        const shuffled = allTarotCards.sort(() => 0.5 - Math.random());
        // ✅ สุ่มไพ่ 1 ใบ (แบบเดียวกับราศีที่แสดง 1 ค่า)
        const selectedCards = shuffled.slice(0, 3);
        // console.log("✅ ไพ่ที่สุ่มได้:", selectedCards);
        // // 🔹 บันทึกลง `user_history`
        const historyEntry = await userHistory_1.UserHistory.create({
            userID,
            type: "tarot",
            tarotName1: selectedCards[0].cardNAME,
            tarotPrediction1: selectedCards[0].cardMEANING,
            tarotImage1: selectedCards[0].cardPHOTO,
            tarotName2: selectedCards[1].cardNAME,
            tarotPrediction2: selectedCards[1].cardMEANING,
            tarotImage2: selectedCards[1].cardPHOTO,
            tarotName3: selectedCards[2].cardNAME,
            tarotPrediction3: selectedCards[2].cardMEANING,
            tarotImage3: selectedCards[2].cardPHOTO
        });
        return res.json({
            message: "สุ่มไพ่สำเร็จและบันทึกประวัติแล้ว",
            userID,
            tarotCards: [
                {
                    tarotName: selectedCards[0].cardNAME,
                    tarotPrediction: selectedCards[0].cardMEANING,
                    tarotImage: selectedCards[0].cardPHOTO
                },
                {
                    tarotName: selectedCards[1].cardNAME,
                    tarotPrediction: selectedCards[1].cardMEANING,
                    tarotImage: selectedCards[1].cardPHOTO
                },
                {
                    tarotName: selectedCards[2].cardNAME,
                    tarotPrediction: selectedCards[2].cardMEANING,
                    tarotImage: selectedCards[2].cardPHOTO
                }
            ],
            historyID: historyEntry._id
        });
    }
    catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการสุ่มไพ่", error.message);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
exports.drawTarot = drawTarot;
//# sourceMappingURL=tarot.js.map