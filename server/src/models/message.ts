import mongoose from "mongoose"; //เหมือนคีเอตใน SQL

const MessageSchema = new mongoose.Schema(
  {
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
        required: true, //บังคับกรอกมั้ย
    },
    content: {
      type: String,
      required: true, //บังคับกรอกมั้ย
    },
  },
  { timestamps: true } //บันทึกเวลา
);

export const Message = mongoose.model('message', MessageSchema); 