import React, { useState } from "react";

const Home = () => {
  const [articles] = useState([
    {
      subject: "DSA",
      title: "Introduction to Data Structures",
      description: "Learn the basics of data structures, including arrays, linked lists, and trees.",
      image: "https://via.placeholder.com/300x150?text=DSA+Article",
      url: "https://example.com/dsa-article",
    },
    {
      subject: "DSA",
      title: "Algorithm Optimization Tips",
      description: "Enhance your coding skills with advanced optimization techniques.",
      image: "https://via.placeholder.com/300x150?text=DSA+Optimization",
      url: "https://example.com/dsa-optimization",
    },
    {
      subject: "Competitive_Programming",
      title: "Top 10 Competitive Programming Strategies",
      description: "Boost your skills with expert tips for coding contests.",
      image: "https://via.placeholder.com/300x150?text=CP+Strategies",
      url: "https://example.com/cp-strategies",
    },
    {
      subject: "Competitive_Programming",
      title: "Dynamic Programming Explained",
      description: "Master dynamic programming with easy-to-understand examples.",
      image: "https://via.placeholder.com/300x150?text=CP+DP",
      url: "https://example.com/cp-dp",
    },
    {
      subject: "Math",
      title: "Mathematical Theorems for Beginners",
      description: "Learn fundamental theorems with simple explanations.",
      image: "https://via.placeholder.com/300x150?text=Math+Theorems",
      url: "https://example.com/math-theorems",
    },
    {
      subject: "Math",
      title: "Calculus Basics",
      description: "Understand the core concepts of calculus with real-world examples.",
      image: "https://via.placeholder.com/300x150?text=Calculus",
      url: "https://example.com/calculus-basics",
    },
    {
      subject: "Computer_Network",
      title: "Network Security Tips",
      description: "Improve your knowledge of network security best practices.",
      image: "https://via.placeholder.com/300x150?text=Network+Security",
      url: "https://example.com/network-security",
    },
    {
      subject: "Computer_Network",
      title: "OSI Model Explained",
      description: "Learn about the seven layers of the OSI model.",
      image: "https://via.placeholder.com/300x150?text=OSI+Model",
      url: "https://example.com/osi-model",
    },
  ]);

  const subjects = ["DSA", "Competitive_Programming", "Math", "Computer_Network"];
  const token = localStorage.getItem("token"); // Retrieve the token

  const subjectImages = {
    DSA: "https://via.placeholder.com/150?text=DSA+Teacher",
    Competitive_Programming: "https://via.placeholder.com/150?text=CP+Teacher",
    Math: "https://via.placeholder.com/150?text=Math+Teacher",
    Computer_Network: "https://via.placeholder.com/150?text=CN+Teacher",
  };

  const startMeeting = async (subject) => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `https://cloudvendor-1.onrender.com/cloudvendor/create/${subject}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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

      {subjects.map((subject) => (
        <div key={subject} style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <h2>{subject.replace("_", " ")}</h2>
            <img
              src={subjectImages[subject]}
              alt={subject}
              style={{ width: "150px", height: "150px", borderRadius: "10px" }}
            />
            <button
              onClick={() => startMeeting(subject)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Start / Join {subject.replace("_", " ")} Class
            </button>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
            {articles
              .filter((article) => article.subject === subject)
              .map((article, index) => (
                <div
                  key={index}
                  style={{
                    width: "300px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "10px" }}>
                    <h3 style={{ fontSize: "18px" }}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "#007BFF" }}
                      >
                        [{article.title}]
                      </a>
                    </h3>
                    <p style={{ fontSize: "14px", color: "#555" }}>
                      {article.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
