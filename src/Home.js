import React, { useState, useEffect } from "react";

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [articles, setArticles] = useState([]);
  const subjects = ["DSA", "Competitive_Programming", "Math", "Computer_Network"];
  const token = localStorage.getItem("token"); // Retrieve the token

  // Images for subjects
  const subjectImages = {
    DSA: "https://via.placeholder.com/150?text=DSA+Teacher",
    Competitive_Programming: "https://via.placeholder.com/150?text=CP+Teacher",
    Math: "https://via.placeholder.com/150?text=Math+Teacher",
    Computer_Network: "https://via.placeholder.com/150?text=CN+Teacher",
  };

  // Fetch random articles from a third-party API
  useEffect(() => {
    const fetchArticles = async () => {
      if (!selectedSubject) return;

      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${selectedSubject}&apiKey=YOUR_NEWS_API_KEY`
        );

        if (!response.ok) throw new Error("Failed to fetch articles.");

        const data = await response.json();
        const randomArticles = data.articles.slice(0, 3); // Get 3 random articles
        setArticles(randomArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [selectedSubject]);

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

      {articles.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Latest Teacher-Related Articles</h2>
          <ul>
            {articles.map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
                <p>{article.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
