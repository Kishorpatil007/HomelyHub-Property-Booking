import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error("Name:", error.name);
        console.error("Code:", error.code);
        console.error("Message:", error.message);

        throw error;
    }
};

export default connectDB;