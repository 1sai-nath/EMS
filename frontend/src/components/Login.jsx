import React, { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful");

    }else{
        alert(data.message);
    }
  };
  return <>
<form onSubmit={handleSubmit} className="max-w-md mx-auto">
    <div className="mb-4">
    <label className="block text-gray-700">Username</label>
    <input type="text" name="username" onChange={handleChange} required className="mt-1 block w-full border rounded-md p-2" />
 </div>
 <div className="mb-4">
   <label className="block text-gray-700">Password</label>
   <input type="password" name="password" onChange={handleChange} required className="mt-1 block w-full border rounded-md p-2" />
 </div>
 <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
</form>
  </>;
};

export default Login;
