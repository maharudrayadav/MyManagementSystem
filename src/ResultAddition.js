import React, { useState } from "react";

const ResultAddition = () => {
  const [formData, setFormData] = useState({
    vendorId: "",
    vendorName: "",
    subject: "",
    marks: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token"); // Get JWT token from localStorage

    if (!token) {
      setError("Authentication token is missing. Please log in.");
      return;
    }

    try {
      const response = await fetch("https://cloudvendor-production.up.railway.app/cloudvendor/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Include JWT token
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save the result. Authentication required.");
      }

      alert("Result saved successfully!");
      setFormData({ vendorId: "", vendorName: "", subject: "", marks: "" });

    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred.");
    }
  };

  return (
    <div className="page registration">
      <h1>Vendor Registration</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="vendorId"
          placeholder="Vendor ID"
          value={formData.vendorId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          value={formData.vendorName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="marks"
          placeholder="Marks"
          value={formData.marks}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ResultAddition;
