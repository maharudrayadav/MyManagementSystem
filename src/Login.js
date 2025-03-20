import React, { useState } from "react";

const Login = ({ setIsAuthenticated, setCurrentPage }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://cloudvendor-1.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.email, // Ensure API expects email as username
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Save JWT token
      setIsAuthenticated(true);
      setCurrentPage("home"); // Redirect after login
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server or invalid credentials");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://cloudvendor-1.onrender.com/auth/googleLoginSuccess";
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
      <p>Or</p>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
