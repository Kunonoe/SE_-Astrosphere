"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String }, // ✅ เพิ่มชื่อจริง
    lastname: { type: String }, // ✅ เพิ่มนามสกุล
    birthday: { type: String }, // ✅ เพิ่มวันเกิด
}, { timestamps: true });
exports.Account = mongoose_1.default.model("Account", accountSchema);
//# sourceMappingURL=login.js.map