import express from "express";

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
