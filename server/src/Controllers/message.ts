import express from "express";
import { Message } from "../models/message";

export const reciveContent = async (req: express.Request, res: express.Response) => {
    try {
        const { content } = req.body
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        const result = await new Message({ //await รันทั้งหน้า
            userID: '67bc2de95d8ce37dcf9c6292',
            content: content,
            sendDate: currentDate,
        }).save();

        if(!result){ //ไม่เจอข้อความที่ส่ง
            return res.sendStatus(400);
        }

        return res.send({ //เจอข้อความที่ส่ง
            status: "success",
            result: result
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};