import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setAdminName }) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Save token in local storage
            setIsAuthenticated(true); // Set authenticated state
            setAdminName(credentials.username); // Set admin name
            alert('Login successful! Redirecting to dashboard...');
            navigate('/'); // Redirect to dashboard on successful login
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message); // Set specific error message from server
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                {/* Username */}
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={credentials.username} 
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
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>

                {/* Error Message */}
                {errorMessage && (
                    <p className="mt-4 text-red-500">{errorMessage}</p>
                )}

                {/* Link to Registration Page */}
                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account?{' '}
                    <span
                      onClick={() => navigate('/register')}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      Register here.
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;