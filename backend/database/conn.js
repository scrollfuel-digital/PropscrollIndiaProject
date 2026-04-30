import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conn() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4, // VERY IMPORTANT (fix DNS / network issue)
        });
       
        console.log("Connection with Database was successful!");
    } catch (err) {
        console.log(" Unable to connect with database!", err.message);
    }
}

conn();