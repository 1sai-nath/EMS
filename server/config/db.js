import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo");
  } catch (error) {
    console.log("Failed to connect to Mongo", error.message);
    process.exit(1);
  }
};

export default connectDB;
