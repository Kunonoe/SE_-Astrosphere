import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String },  // ✅ เพิ่มชื่อจริง
    lastname: { type: String },   // ✅ เพิ่มนามสกุล
    birthday: { type: String },   // ✅ เพิ่มวันเกิด
}, { timestamps: true });

export const Account = mongoose.model("Account", accountSchema);
