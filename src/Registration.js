import React, { useState } from "react";

const Registration = () => {
  const [vendorData, setVendorData] = useState({
    vendorId: "",
    vendorName: "",
    vendorAddress: "",
    vendorPhoneNumber: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
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
      const response = await fetch("https://cloudvendor-1.onrender.com/cloudvendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Include JWT token
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error("Failed to register vendor. Authentication required.");
      }

      alert("Vendor registered successfully!");
      setVendorData({
        vendorId: "",
        vendorName: "",
        vendorAddress: "",
        vendorPhoneNumber: "",
      });

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
          value={vendorData.vendorId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          value={vendorData.vendorName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="vendorAddress"
          placeholder="Vendor Address"
          value={vendorData.vendorAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          name="vendorPhoneNumber"
          placeholder="Vendor Phone Number"
          value={vendorData.vendorPhoneNumber}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
