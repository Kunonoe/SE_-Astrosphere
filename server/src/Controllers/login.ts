import express,{Request , Response} from "express";

export function getdata(req:Request,res:Response){//req รับจากหน้าบ้าน ไฟล์ json ,, res ส่งกลับ
    res.send("hello")
}
export function login(req:Request,res:Response){
    try{//กันเวลาดึไม่ได้ ดาต้าเบดได้ฟ้องกลับมา
        const {name,password}=req.body //รับพารามิเตอร์จากหน้าบ้าน มาคำนวน
        res.send({
            status:"saccess",
            name:name
        })
    }catch (error){
        res.status(500).send('$(error)');
    }
}