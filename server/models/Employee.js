import mongoose from "mongoose";

const employeeShema = new mongoose.Schema(
  {
    f_Id: {
      type: Number,
      required: true,
      unique: true,
    },
    f_Image: {
      type: String,
    },
    f_Name: {
      type: String,
      required: true,
      trim: true,
    },
    f_Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    f_Mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    f_Designation: {
      type: String,
      required: true,
    },
    f_gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    f_Course: {
      type: String,
    },
  },
  { timestamps: true }
);

const Employee=mongoose.model("Employee",employeeShema);
export default Employee;
