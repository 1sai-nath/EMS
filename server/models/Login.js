import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    f_sno: {
      type: Number,
      required: true,
      unique: true,
    },
    f_userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    f_Pwd: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

const Login = mongoose.model("Login", loginSchema);
