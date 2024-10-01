import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeComponent = ({ addEmployee }) => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    f_Id: "",
    f_Image: null,
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
  });
  const [notification, setNotification] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "f_Image") {
      setEmployeeData({ ...employeeData, [e.target.name]: e.target.files[0] });
    } else {
      setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(employeeData).forEach((key) =>
      formData.append(key, employeeData[key])
    );

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: { Authorization: token },
        body: formData,
      });

      if (response.ok) {
        const newEmployee = await response.json(); // Get the newly created employee data
        addEmployee(newEmployee); // Call the callback to add the new employee to the list
        setNotification("Employee added successfully!");
        setTimeout(() => {
          navigate("/employees"); // Redirect to employee list after 2 seconds
        }, 2000);
      } else {
        const errorData = await response.json();
        setNotification(`Error occurred: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during employee creation:", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>

      {/* Employee ID */}
      <div className="mb-4">
        <label className="block text-gray-700">Employee ID</label>
        <input
          type="text"
          name="f_Id"
          value={employeeData.f_Id}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="f_Name"
          value={employeeData.f_Name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="f_Email"
          value={employeeData.f_Email}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      {/* Mobile */}
      <div className="mb-4">
        <label className="block text-gray-700">Mobile</label>
        <input
          type="text"
          name="f_Mobile"
          value={employeeData.f_Mobile}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      {/* Designation */}
      <div className="mb-4">
        <label className="block text-gray-700">Designation</label>
        <input
          type="text"
          name="f_Designation"
          value={employeeData.f_Designation}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-gray-700">Gender</label>
        <select
          name="f_gender"
          value={employeeData.f_gender}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Course */}
      <div className="mb-4">
        <label className="block text-gray-700">Course</label>
        <input
          type="text"
          name="f_Course"
          value={employeeData.f_Course}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-gray-700">Upload Image</label>
        <input
          type="file"
          name="f_Image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Employee
      </button>

      {/* Notification Message */}
      {notification && (
        <p
          className={`mt-4 ${
            notification.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {notification}
        </p>
      )}
    </form>
  );
};

export default EmployeeComponent;
