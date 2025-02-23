import express from "express";
import { Account } from "../models/login";
import bcrypt from "bcrypt";

export const testData = async (req: express.Request, res: express.Response) => {
    try{

        return res.status(200).send("hello world").end();

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {name,password } = req.body;

        // ค้นหาผู้ใช้จากฐานข้อมูล
        const user = await Account.findOne({ username: name });
        console.log("Input password:", password);
        console.log("Stored hashed password:", user.password);

        if (!user) {
            return res.status(400).send({ status: "error", message: "User not found" });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ status: "error", message: "Incorrect password" });
        }

        return res.send({
            status: "success",
            message: "Login successful"
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// export const login = async (req: express.Request, res: express.Response) => {
//     try{

//         const {name,password}=req.body //รับพารามิเตอร์จากหน้าบ้าน มาคำนวน

//         return res.send({
//             status:"saccess",
//             name:name
//         })

//     }catch (error) {
//         console.log(error);
//         return res.sendStatus(400);
//     }
// }
export const register = async (req: express.Request, res: express.Response) => {
    try{

        const {name,password,email}=req.body //รับพารามิเตอร์จากหน้าบ้าน มาคำนวน
        
        // เข้ารหัสรหัสผ่านก่อนบันทึก
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await new Account({ //await รันทั้งหน้า
            username:name,
            password:hashedPassword,// ใช้รหัสผ่านที่เข้ารหัสแล้ว
            email:email
        }).save(); 
        return res.send({ //ถ้าเซฟได้ให้้ส่งกลับไป
            status: "success",
            result:result
        });

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
       
        // ค้นหาผู้ใช้ก่อนอัปเดต
        const user = await Account.findOne({ username: username });
        if (!user) {
            return res.status(400).send({ status: "error", message: "User not found" });
        }

        // เข้ารหัสรหัสผ่านใหม่
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        // อัปเดตรหัสผ่าน
        const result = await Account.updateOne(
            { username: username }, 
            { $set: { password: hashedPassword } }
        );

        return res.send({ status: "success", result });

    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
