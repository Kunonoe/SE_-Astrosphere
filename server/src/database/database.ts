import mongoose from "mongoose";
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected')
    }catch (error){
        console.log(error)
    }
}