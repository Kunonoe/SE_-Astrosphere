require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose, { connect } from 'mongoose';
import router from './router'; // รวม router ทุกตัว
import { sendScheduledMessages } from './SubServer/sendmessages';
import "./SubServer/croncounttime";
const app : express.Express = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// เชื่อม MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error));

// เริ่มต้น Server
app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Sever running on port: ${process.env.SERVER_PORT || 5000}`);
});

// เรียกใช้ Router ที่ "/api"
app.use('/api', router());

// เรียกฟังก์ชันส่งข้อความทันทีเมื่อเซิร์ฟเวอร์เริ่มทำงาน
sendScheduledMessages();