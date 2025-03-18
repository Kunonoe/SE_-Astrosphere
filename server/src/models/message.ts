import mongoose from "mongoose"; 

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
        required: true, 
    },
    content: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true } //บันทึกเวลา
);

export const Message = mongoose.model('message', MessageSchema); 