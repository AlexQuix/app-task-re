import mongoose from "mongoose";

export async function connectToDatabase(){
    try{
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as any);

        console.log('DataBase conected');
    }catch(e){
        console.log("Could not connect to database: " + e);
    }
}