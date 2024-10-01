import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/employees", {
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setEmployees(data);
    } else {
      console.error("Failed to fetch employees");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this employee?")) {
      const response = await fetch(
        `http://localhost:3000/api/employees/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        setEmployees(employees.filter((emp) => emp._id !== id));
        alert("Employee deleted successfully");
      } else {
        alert("Failed to delete employee");
      }
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {filteredEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{employee.f_Id}</td>
                <td className="border px-4 py-2">
                  {employee.f_Image && (
                    <img
                      src={employee.f_Image}
                      alt={employee.f_Name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                </td>
                <td className="border px-4 py-2">{employee.f_Name}</td>
                <td className="border px-4 py-2">{employee.f_Email}</td>
                <td className="border px-4 py-2">{employee.f_Mobile}</td>
                <td className="border px-4 py-2">{employee.f_Designation}</td>
                <td className="border px-4 py-2">{employee.f_gender}</td>
                <td className="border px-4 py-2">{employee.f_Course}</td>
                <td className="border px-4 py-2">
                  {/* Edit button */}
                  <Link
                    to={`/edit/${employee._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
