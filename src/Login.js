import React, { useState } from "react";

const Login = ({ setIsAuthenticated, setCurrentPage }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("teacher"); // Default to teacher

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
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
        // Teacher API returns token
        const token = await response.text();
        localStorage.setItem("token", token.replace("Bearer ", ""));
      }

      // Student API doesn't return anything but still indicates success
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
