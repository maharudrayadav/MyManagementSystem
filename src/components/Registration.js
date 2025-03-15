import React, { useState } from "react";

const Registration = () => {
  const [vendorData, setVendorData] = useState({ vendorId: "", vendorName: "", vendorAddress: "", vendorPhoneNumber: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://cloudvendor-1.onrender.com/cloudvendor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendorData),
    }).then(() => {
      alert("Vendor registered successfully!");
      setVendorData({ vendorId: "", vendorName: "", vendorAddress: "", vendorPhoneNumber: "" });
    });
  };

  return (
    <div className="page registration">
      <h1>Vendor Registration</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="vendorId" placeholder="Vendor ID" value={vendorData.vendorId} onChange={handleChange} required />
        <input type="text" name="vendorName" placeholder="Vendor Name" value={vendorData.vendorName} onChange={handleChange} required />
        <input type="text" name="vendorAddress" placeholder="Vendor Address" value={vendorData.vendorAddress} onChange={handleChange} />
        <input type="text" name="vendorPhoneNumber" placeholder="Vendor Phone Number" value={vendorData.vendorPhoneNumber} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
