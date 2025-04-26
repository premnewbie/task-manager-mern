import mongoose from "mongoose";

export async function connectDb(){
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database succesfully",conn.connection.host);
    }catch(e){
        console.log("Unable to connect to the database",e.message)
    }
}