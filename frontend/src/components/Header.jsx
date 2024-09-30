import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ adminName, isAuthenticated, setIsAuthenticated, setAdminName }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from local storage
        setIsAuthenticated(false); // Update authentication state
        setAdminName(null); // Clear admin name
        alert('Logout successfully!'); // Show logout message
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">Company Name</h1>
            <nav>
                <ul className="flex space-x-4">
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
                            <li><Link to="/employees" className="hover:text-gray-400">Employee List</Link></li>
                            {/* Show Add Employee only on Dashboard */}
                            {location.pathname === '/' && (
                                <li><Link to="/add" className="hover:text-gray-400">Add Employee</Link></li>
                            )}
                            <li className="font-semibold">{adminName}</li>
                            <li>
                                <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
                            </li>
                        </>
                    ) : (
                        <li><Link to="/register" className="hover:text-gray-400">Register</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;