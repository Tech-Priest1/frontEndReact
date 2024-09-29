const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        console.log("MongoDB URI:", process.env.MONGO_URI); // Log the MongoDB URI
        await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; // Re-throw the error so it can be handled in app.js
    }
};


module.exports = connectDB;
