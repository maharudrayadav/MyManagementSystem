import React, { useState } from "react";
import axios from "axios";

const Signup = ({ setCurrentPage }) => {
  const [userType, setUserType] = useState("teacher"); // Default to teacher
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    className: "",
    rollNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = userType === "teacher"
        ? "https://cloudvendor-1.onrender.com/auth/register"  // Teacher API
        : "http://localhost:8080/authStudent/register";        // Student API

      const payload = userType === "teacher"
        ? {
            name: formData.name,
            address: formData.address,
            username: formData.email,
            password: formData.password,
          }
        : {
            username: formData.email,
            password: formData.password,
            name: formData.name,
            address: formData.address,
            className: formData.className,
            rollNo: formData.rollNo,
          };

      const response = await axios.post(url, payload);

      if (response.status === 200) {
        alert(`${userType} registration successful!`);
        setCurrentPage("home");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>

      {/* Dropdown for selecting Teacher or Student */}
      <div>
        <label>User Type:</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Show extra fields only for students */}
        {userType === "student" && (
          <>
            <input
              type="text"
              name="className"
              placeholder="Class Name"
              value={formData.className}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="rollNo"
              placeholder="Roll No"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
