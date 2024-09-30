import { Router } from "express";
import Employee from "../models/Employee.js";
import authMiddleware from "../middleware/authMiddleware.js";
import cloudinary from "cloudinary";
import multer from "multer";
import streamifier from "streamifier"; // Import streamifier

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Employee route with image upload
router.post("/", authMiddleware, upload.single("f_Image"), async (req, res) => {
  const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

  try {
    let imageUrl = null; // Initialize imageUrl

    if (req.file) {
      // Create a promise for uploading the image
      const uploadImageToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error); // Log any errors
                return reject(error);
              }
              resolve(result.secure_url); // Resolve with the secure URL
            }
          );

          // Pipe the file buffer to Cloudinary
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      // Wait for the image upload to complete
      imageUrl = await uploadImageToCloudinary();
    }

    const newEmployee = new Employee({
      f_Id,
      f_Image: imageUrl || null,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: error.message });
  }
});

// Update Employee route
router.put(
  "/:id",
  authMiddleware,
  upload.single("f_Image"),
  async (req, res) => {
    const {
      f_Id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    } = req.body;

    try {
      let updatedData = {
        f_Id,
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_gender,
        f_Course,
      };

      if (req.file) {
        const uploadImageToCloudinary = () => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary Upload Error:", error); // Log any errors
                  return reject(error);
                }
                resolve(result.secure_url); // Resolve with the secure URL
              }
            );

            // Pipe the file buffer to Cloudinary
            streamifier.createReadStream(req.file.buffer).pipe(stream);
          });
        };

        // Wait for the image upload to complete
        updatedData.f_Image = await uploadImageToCloudinary();
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      if (!updatedEmployee)
        return res.status(404).json({ message: "Employee not found" });

      res.json(updatedEmployee);
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete Employee route by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: error.message });
  }
});

// Get all employees route
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search employees by name route
router.get("/search", authMiddleware, async (req, res) => {
  const { name } = req.query; // Get the 'name' query parameter

  try {
    const employees = await Employee.find({
      f_Name: { $regex: name, $options: "i" }, // Case-insensitive search
    });

    if (employees.length === 0)
      return res.status(404).json({ message: "No employees found" });

    res.json(employees);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: error.message });
  }
});

export default router;
