import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm"; // Import for adding/editing employees

function App() {
  const [adminName, setAdminName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setAdminName(decodedToken.username);
    }
  }, []);

  return (
    <Router>
      <Header
        adminName={adminName}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setAdminName={setAdminName}
      />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setAdminName={setAdminName}
              />
            }
          />
          <Route
            path="/employees"
            element={
              isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />
            }
          />
          {/* Route for adding a new employee */}
          <Route
            path="/add"
            element={
              isAuthenticated ? <EmployeeForm /> : <Navigate to="/login" />
            }
          />
          {/* Route for editing an existing employee */}
          <Route
            path="/edit/:id"
            element={
              isAuthenticated ? <EmployeeForm /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
