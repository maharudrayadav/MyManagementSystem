import React, { useState } from "react";

const Login = ({ setIsAuthenticated, setCurrentPage }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // 🔹 Handle Traditional Login (Email & Password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://cloudvendor-1.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.email, 
          password: loginData.password,
        }),
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store token
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        setCurrentPage("home"); 
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server");
    }
  };

  // 🔹 Handle Google OAuth Login
  const handleGoogleLogin = async () => {
    window.location.href = "https://cloudvendor-1.onrender.com/oauth2/authorization/google";
  };

  // 🔹 After Google OAuth success, backend redirects user to a success page with token
  const checkGoogleAuth = async () => {
    try {
      const response = await fetch("https://cloudvendor-1.onrender.com/auth/googleLoginSuccess", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        setCurrentPage("home");
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  // 🔹 Check if user was redirected from Google OAuth
  React.useEffect(() => {
    checkGoogleAuth();
  }, []);

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
