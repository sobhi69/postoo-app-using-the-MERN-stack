import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI || '')
    } catch (error) {
        console.error(`error while connecting to DB`)
    }
} 