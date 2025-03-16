import React, { useState } from "react";

const Login = ({ setIsAuthenticated }) => {
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
          // Make sure the JSESSIONID cookie is sent correctly by the browser
          // No need to explicitly set the Cookie header in the fetch request
        },
        body: JSON.stringify({
          username: loginData.email,  // Mapping email to username as per your API
          password: loginData.password,
        }),
        credentials: "include",  // Ensures cookies are sent with the request
      });

      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "YOUR_BACKEND_API/auth/google";
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
