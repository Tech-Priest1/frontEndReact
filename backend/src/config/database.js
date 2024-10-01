const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); 

const connectDB = async () => {
    try {
        console.log("MongoDB URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; 
    }
};


module.exports = connectDB;
