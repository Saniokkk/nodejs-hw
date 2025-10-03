import mongoose from "mongoose"

export const connectMongoDB = async () => {

    // const mongoUrl = process.env.MONGO_URL
    const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(MONGO_URL)
        console.log("✅ MongoDB connection established successfully");
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        process.exit(1)
    }
}