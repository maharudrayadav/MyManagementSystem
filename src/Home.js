import React, { useState, useEffect } from "react";

const Home = () => {
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

  // Fetch articles for all subjects
  useEffect(() => {
    const fetchAllArticles = async () => {
      const allArticles = {};

      for (const subject of subjects) {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/everything?q=${subject}&apiKey=YOUR_NEWS_API_KEY`
          );

          if (!response.ok) throw new Error(`Failed to fetch articles for ${subject}`);

          const data = await response.json();
          allArticles[subject] = data.articles.slice(0, 3); // Display 3 articles per subject

        } catch (error) {
          console.error(`Error fetching articles for ${subject}:`, error);
          allArticles[subject] = [];
        }
      }

      setArticles(allArticles);
    };

    fetchAllArticles();
  }, []);

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
            {articles[subject] && articles[subject].length > 0 ? (
              articles[subject].map((article, index) => (
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
                    src={article.urlToImage || "https://via.placeholder.com/300x150"}
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
                      {article.description || "No description available."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No articles found for {subject.replace("_", " ")}.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
