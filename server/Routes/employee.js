import { Router } from "express";
import Employee from "../models/Employee";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// create employee route
router.post("/", async (req, res) => {
  const {
    f_Id,
    f_Image,
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_gender,
    f_Course,
  } = req.body;

  // validate required fields
  if (
    !f_Id ||
    !f_Name ||
    !f_Email ||
    !f_Mobile ||
    !f_Designation ||
    !f_gender
  ) {
    return res.status(400).json({
      message: "All fields except image and couurse are required",
    });
  }
  try {
    const newEmployee = new Employee({
      f_Id,
      f_Image,
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
    res.status(500).json({
      message: error.message,
    });
  }
});

// get all employees route
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// delete employee route by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({
      message: "employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
        message: error.message,
    })
  }
});
export default router;
