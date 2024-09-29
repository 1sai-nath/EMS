import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Login from "../models/Login";

const router = Router();

// register route
router.post("/register", async (req, res) => {
  const { f_sno, f_userName, f_Pwd } = req.body;

  if (!f_sno || !f_userName || f_Pwd) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await Login.findOne({ f_userName });
    if (existingUser)
      return res.status(422).json({
        message: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(f_Pwd, 10);

    const newUser = new Login({
      f_sno,
      f_userName,
      f_Pwd: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Login.findOne({ f_userName: username });
    if (!user)
      return res.status(400).json({
        message: "inavalid login details",
      });

    const isMatch = await bcrypt.compare(password, user.f_Pwd);
    if (!isMatch)
      return res.status(400).json({
        message: "inavalid login details",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      username,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
