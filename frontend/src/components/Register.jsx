import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    f_sno: "",
    f_userName: "",
    f_Pwd: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">serial Number</label>
          <input
            type="number"
            name="f_sno"
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="f_userName"
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="f_Pwd"
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >Register</button>
      </form>
    </>
  );
};

export default Register;
