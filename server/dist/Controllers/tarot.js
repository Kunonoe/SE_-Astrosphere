"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTarotByID = exports.ListTarot = void 0;
const tarocard_1 = require("../models/tarocard");
const database_1 = __importDefault(require("../database/database"));
const ListTarot = async (req, res) => {
    try {
        await (0, database_1.default)();
        const cards = await tarocard_1.Tarot.find({}).lean();
        return res.json({ cards });
    }
    catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการแสดงรายการไพ่:", error.message);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
};
exports.ListTarot = ListTarot;
const getTarotByID = async (req, res) => {
    try {
        await (0, database_1.default)();
        const card = await tarocard_1.Tarot.findOne({ cardID: Number(req.params.id) }).lean();
        console.log(card);
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }
        return res.json(card);
    }
    catch (error) {
        console.error("❌ Error fetching tarot card:", error);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.getTarotByID = getTarotByID;
//# sourceMappingURL=tarot.js.map