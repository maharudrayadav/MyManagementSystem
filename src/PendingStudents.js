import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";  // ✅ Import the CSS file

const PendingStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending students
  useEffect(() => {
    const fetchPendingStudents = async () => {
      try {
        const response = await axios.get("https://cloudvendor-1.onrender.com/authStudent/pending");
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pending students:", error);
        setLoading(false);
      }
    };
    fetchPendingStudents();
  }, []);

  // Approve a student
  const approveStudent = async (username) => {
    try {
      await axios.put(`https://cloudvendor-production.up.railway.app/authStudent/approve/${username}`);
      alert(`Student ${username} approved!`);
      setStudents(students.filter((student) => student.username !== username));
    } catch (error) {
      console.error("Error approving student:", error);
      alert("Failed to approve student.");
    }
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="pending-container">
      <h2 className="pending-title">Pending Students</h2>
      {students.length === 0 ? (
        <p className="no-students">No pending students</p>
      ) : (
        <div className="student-cards">
          {students.map((student) => (
            <div key={student.username} className="student-card">
              <h3>{student.name}</h3>
              <p><strong>Username:</strong> {student.username}</p>
              <p><strong>Class:</strong> {student.className}</p>
              <p><strong>Roll No:</strong> {student.rollNo}</p>
              <button
                className="approve-btn"
                onClick={() => approveStudent(student.username)}
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingStudents;
