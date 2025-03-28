import React, { useState } from "react";

const Registration = () => {
  const [vendorData, setVendorData] = useState({
    vendorId: "",
    vendorName: "",
    vendorAddress: "",
    vendorPhoneNumber: "",
    vendorImage: null, // Added for file upload
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Handle file input separately
    if (name === "vendorImage") {
      setVendorData({ ...vendorData, vendorImage: files[0] });
    } else {
      setVendorData({ ...vendorData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token"); // Get JWT token from localStorage

    if (!token) {
      setError("Authentication token is missing. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("vendorId", vendorData.vendorId);
    formData.append("vendorName", vendorData.vendorName);
    formData.append("vendorAddress", vendorData.vendorAddress);
    formData.append("vendorPhoneNumber", vendorData.vendorPhoneNumber);
    formData.append("vendorImage", vendorData.vendorImage);

    try {
      const response = await fetch("https://cloudvendor-production.up.railway.app/cloudvendor", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token
        },
        body: formData,
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
        vendorImage: null, // Reset file input
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
        <input
          type="file"
          name="vendorImage"
          onChange={handleChange}
          accept=".jpg, .jpeg, .png"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
