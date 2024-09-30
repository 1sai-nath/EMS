import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/auth.js";
import employeeRoutes from "./Routes/employee.js";
import cloudinary from "cloudinary";
import multer from "multer";

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// connect to db
connectDB();

// route
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
