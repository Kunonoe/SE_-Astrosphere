import express from "express";
import { Account } from "../models/login";

export const testData = async (req: express.Request, res: express.Response) => {
    try{

        return res.status(200).send("hello world").end();

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try{

        const {name,password}=req.body //รับพารามิเตอร์จากหน้าบ้าน มาคำนวน
        return res.send({
            status:"saccess",
            name:name
        })

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const register = async (req: express.Request, res: express.Response) => {
    try{

        const {name,password,email}=req.body //รับพารามิเตอร์จากหน้าบ้าน มาคำนวน
        const result = await new Account({ //await รันทั้งหน้า
            username:name,
            password:password,
            email:email
        }).save(); 
        return res.send({ //ถ้าเซฟได้ให้้ส่งกลับไป
           result:result
        })

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const getuser = async (req: express.Request, res: express.Response) => {
    try{

        const {name}=req.body //รับพารามิเตอร์จากหน้าบ้าน มาคำนวน
        const result = await Account.find({ //หา
            username :name // หาuser = name เหมือน select
        }) 
        return res.send({ //ถ้าเซฟได้ให้้ส่งกลับไป
           result:result
        })

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const update = async (req: express.Request, res: express.Response) => {
    try{

        const {username,newpassword}=req.body //รับพารามิเตอร์จากหน้าบ้าน มาคำนวน
        const result = await Account.updateOne({ //หา
            username : username // หาuser = name เหมือน select
        },{$set: { password: newpassword }})
        return res.send({ //ถ้าเซฟได้ให้้ส่งกลับไป
           result:result
        })

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
