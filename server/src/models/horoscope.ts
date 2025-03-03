import mongoose from "mongoose"; //เหมือนคีเอตใน SQL

const HoroscopeSchema = new mongoose.Schema(
  {
    cardId: {
      type: String,
      required: true,
    },
    cardName: {
        type: String,
        required: true, //บังคับกรอกมั้ย
    },
    cardMeaning: {
        type: String,
        required: true, //บังคับกรอกมั้ย
    }
}
);

export const Horoscope = mongoose.model('horoscope', HoroscopeSchema); 