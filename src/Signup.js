import React, { useState } from "react";

const Signup = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://cloudvendor-1.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          username: formData.email,  // Mapping email to username
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert("Registration successful!");
        setCurrentPage("home"); // Redirect to Home
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error connecting to server.");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "YOUR_BACKEND_API/auth/google";
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Or</p>
      <button onClick={handleGoogleSignup}>Sign Up with Google</button>
    </div>
  );
};

export default Signup;
