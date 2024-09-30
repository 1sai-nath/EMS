import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    f_sno: "",
    f_userName: "",
    f_Pwd: "",
  });
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting registration:", formData); // Log form data

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification("User registered successfully!");
        console.log("Registration successful!"); // Log success
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        const errorData = await response.json();
        setNotification(`Registration failed: ${errorData.message}`);
        console.error("Registration failed:", errorData); // Log error
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log network errors
      setNotification("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        {/* Serial Number */}
        <div className="mb-4">
          <label className="block text-gray-700">Serial Number</label>
          <input
            type="number"
            name="f_sno"
            value={formData.f_sno}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="f_userName"
            value={formData.f_userName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="f_Pwd"
            value={formData.f_Pwd}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
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

        {/* Link to Login Page */}
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Login here.
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
