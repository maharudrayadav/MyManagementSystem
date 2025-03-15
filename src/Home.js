import React, { useState, useRef } from "react";

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const subjects = ["DSA", "Competitive_Programming", "Math", "Computer_Network"];

  const startMeeting = async () => {
    if (!selectedSubject) {
      alert("Please select a subject.");
      return;
    }
  
    try {
      const response = await fetch(`https://cloudvendor-1.onrender.com/cloudvendor/create/${selectedSubject}`);
      if (!response.ok) throw new Error("Failed to fetch meeting URL.");
      
      const url = await response.text();
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error starting meeting:", error);
    }
  };

  return (
    <div className="page home">
      <h1>Welcome</h1>
      <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">Select a Subject</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>{subject.replace("_", " ")}</option>
        ))}
      </select>
      <button onClick={startMeeting}>Start / Join Class</button>
    </div>
  );
};

export default Home;
