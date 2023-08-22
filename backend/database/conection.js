import mongoose from "mongoose";

export default async function connect(){
    await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("db connected")
}