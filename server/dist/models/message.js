"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    userID: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true, //บังคับกรอกมั้ย
        default: false
    },
    sendDate: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true } //บันทึกเวลา
);
exports.Message = mongoose_1.default.model('message', MessageSchema);
//# sourceMappingURL=message.js.map