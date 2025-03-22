import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";  

const Login = ({ setIsAuthenticated, setCurrentPage }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("teacher");
  const [showPassword, setShowPassword] = useState(false);  

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
    <div className="login-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <select value={userType} onChange={handleUserTypeChange} style={{ width: "100%", padding: "8px", marginBottom: "10px" }}>
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
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        {/* Smaller Password Box */}
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "6px 35px 6px 10px",  // Smaller padding for a compact look
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px"
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#555"
            }}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>

        <button type="submit" style={{ width: "100%", padding: "8px", marginTop: "10px" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
