const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  // If already connected, reuse existing connection
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGO_URI) {
    const errorMsg = "MONGO_URI is not defined in environment variables";
    console.error(`MongoDB Connection Error: ${errorMsg}`);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw new Error(errorMsg);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(` ✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // In serverless, do not hard-exit so Vercel can return a proper HTTP response
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;

