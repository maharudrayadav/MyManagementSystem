import React, { useState } from "react";

const ResultAddition = () => {
  const [formData, setFormData] = useState({
    vendorId: "",
    vendorName: "",
    subject: "",
    marks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://cloudvendor-1.onrender.com/cloudvendor/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      alert("Result saved successfully!");
      setFormData({ vendorId: "", vendorName: "", subject: "", marks: "" });
    });
  };

  return (
    <div className="page registration">
      <h1>Vendor Registration</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="vendorId" placeholder="Vendor ID" value={formData.vendorId} onChange={handleChange} required />
        <input type="text" name="vendorName" placeholder="Vendor Name" value={formData.vendorName} onChange={handleChange} required />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
        <input type="text" name="marks" placeholder="Marks" value={formData.marks} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ResultAddition;
