import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String },  
    lastname: { type: String },  
    birthday: { type: String },   
}, { timestamps: true });

export const Account = mongoose.model("Account", accountSchema);
