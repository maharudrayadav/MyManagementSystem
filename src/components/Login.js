import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address.");
      return;
    }
    if (loginData.password.length < 5) {
      alert("Password must be at least 5 characters long.");
      return;
    }
    localStorage.setItem("isAuthenticated", "true");
    onLoginSuccess();
  };

  return (
    <div className="page login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Gmail Address" value={loginData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
