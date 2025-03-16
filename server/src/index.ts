require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose, { connect } from 'mongoose';
import router from './router';
import { sendScheduledMessages } from './SubServer/sendmessages';
import "./SubServer/croncounttime";
const app : express.Express = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000", // ✅ ใส่ URL ของ Frontend
  credentials: true, // ✅ เปิดให้ส่ง Cookie ไปกับ Request
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error));
app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Sever running on port: ${process.env.SERVER_PORT || 5000}`);
});

app.use('/api', router());
sendScheduledMessages();