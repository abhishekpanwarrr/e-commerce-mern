import mongoose from "mongoose"

export const dbConnection = async() =>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URL)
        console.log("connection successful");
        console.log("res",res.connection.host);
    } catch (error) {
        console.log("mongod connection error: " + error);
    }
}