import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import eye icons

const Login = ({ setIsAuthenticated, setCurrentPage }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("teacher");
  const [showPassword, setShowPassword] = useState(false);  // Toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl =
      userType === "teacher"
        ? "https://cloudvendor-1.onrender.com/auth/login"
        : "https://cloudvendor-1.onrender.com/authStudent/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.email,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      if (userType === "teacher") {
        const token = await response.text();
        localStorage.setItem("token", token.replace("Bearer ", ""));
      }

      setIsAuthenticated(true);
      setCurrentPage("home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server or invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <select value={userType} onChange={handleUserTypeChange}>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}  // Toggle input type
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
            style={{ paddingRight: "40px" }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
