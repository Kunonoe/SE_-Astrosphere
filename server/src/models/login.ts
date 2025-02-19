import mongoose from "mongoose"; //เหมือนคีเอตใน SQL

const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true, //บังคับกรอกมั้ย
    },
    email: {
        type: String,
        required: true, //บังคับกรอกมั้ย
    },
  },
  { timestamps: true } //บันทึกเวลา
);

export const Account= mongoose.model('accounts', AccountSchema); 