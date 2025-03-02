import mongoose from "mongoose"; //เหมือนคีเอตใน SQL

const AccountSchema = new mongoose.Schema(
  {
    cardid: {
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
    }
}
);

export const Account= mongoose.model('accounts', AccountSchema); 