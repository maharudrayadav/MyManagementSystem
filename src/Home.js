import React, { useState } from "react";

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const subjects = ["DSA", "Competitive_Programming", "Math", "Computer_Network"];
  const token = localStorage.getItem("token"); // Retrieve the token

  // Images for subjects
  const subjectImages = {
    DSA: "https://via.placeholder.com/150?text=DSA+Teacher",
    Competitive_Programming: "https://via.placeholder.com/150?text=CP+Teacher",
    Math: "https://via.placeholder.com/150?text=Math+Teacher",
    Computer_Network: "https://via.placeholder.com/150?text=CN+Teacher",
  };

  // Articles for subjects
  const articles = {
    DSA: [
      { title: "Understanding Data Structures", url: "https://example.com/dsa1" },
      { title: "Optimizing Algorithms", url: "https://example.com/dsa2" },
    ],
    Competitive_Programming: [
      { title: "CP Tricks and Tips", url: "https://example.com/cp1" },
      { title: "Top 10 CP Challenges", url: "https://example.com/cp2" },
    ],
    Math: [
      { title: "Advanced Calculus", url: "https://example.com/math1" },
      { title: "Linear Algebra Basics", url: "https://example.com/math2" },
    ],
    Computer_Network: [
      { title: "Network Protocols Explained", url: "https://example.com/cn1" },
      { title: "Understanding TCP/IP", url: "https://example.com/cn2" },
    ],
  };

  const startMeeting = async () => {
    if (!selectedSubject) {
      alert("Please select a subject.");
      return;
    }

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `https://cloudvendor-1.onrender.com/cloudvendor/create/${selectedSubject}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch meeting URL.");

      const url = await response.text();
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error starting meeting:", error);
      alert("Failed to start the meeting. Please try again.");
    }
  };

  return (
    <div className="page home" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Teacher Management</h1>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="">Select a Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject.replace("_", " ")}
            </option>
          ))}
        </select>

        {selectedSubject && (
          <img
            src={subjectImages[selectedSubject]}
            alt={selectedSubject}
            style={{ width: "150px", height: "150px", borderRadius: "10px" }}
          />
        )}
      </div>

      <button
        onClick={startMeeting}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          fontSize: "18px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Start / Join Class
      </button>

      {selectedSubject && (
        <div style={{ marginTop: "30px" }}>
          <h2>Related Articles</h2>
          <ul>
            {articles[selectedSubject]?.map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
