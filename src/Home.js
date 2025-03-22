import React, { useState } from "react";

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const subjects = ["DSA", "Competitive_Programming", "Math", "Computer_Network"];
  const token = localStorage.getItem("token");

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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Your Virtual Classroom</h1>
      </header>

      <div style={styles.content}>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={styles.select}
        >
          <option value="">Select a Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject.replace("_", " ")}
            </option>
          ))}
        </select>

        <button onClick={startMeeting} style={styles.button}>
          🚀 Start / Join Class
        </button>

        {/* Teacher Article Section */}
        <div style={styles.article}>
          <h2 style={styles.articleTitle}>📚 The Impact of Teachers in Education</h2>
          <p>
            Teachers play a vital role in shaping young minds by nurturing creativity, 
            fostering critical thinking, and instilling values. They inspire students 
            to achieve their goals and become lifelong learners.
          </p>
          <p>
            In the digital era, teachers embrace technology to make learning 
            interactive and accessible, bridging the gap between knowledge and students.
          </p>
          <p>
            A passionate teacher leaves a lasting impact, empowering students 
            to explore, innovate, and succeed.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    color: "#fff",
    padding: "40px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  content: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#fff",
    color: "#333",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  select: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    backgroundColor: "#6a11cb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#2575fc",
  },
  article: {
    marginTop: "40px",
    padding: "25px",
    background: "#f1f1f1",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "#333",
  },
  articleTitle: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#6a11cb",
  },
};

export default Home;
