import mongoose from "mongoose"; //เหมือนคีเอตใน SQL

const ToroSchema = new mongoose.Schema(
  {
    cardid: {
      type: String,
      required: true,
    },
    cardname: {
        type: String,
        required: true, //บังคับกรอกมั้ย
    },
    cardmeaning: {
        type: String,
        required: true, //บังคับกรอกมั้ย
    }
}
);

export const Toro= mongoose.model('torocard', ToroSchema); 