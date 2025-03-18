import React, { useState, useEffect } from "react";
import axios from "axios";

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
      await axios.put(`https://cloudvendor-1.onrender.com/authStudent/approve/${username}`);
      alert(`Student ${username} approved!`);

      // Refresh the list after approval
      setStudents(students.filter((student) => student.username !== username));
    } catch (error) {
      console.error("Error approving student:", error);
      alert("Failed to approve student.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Pending Students</h2>
      {students.length === 0 ? (
        <p>No pending students</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.username}>
              <div>
                <strong>{student.name}</strong> ({student.username})
              </div>
              <div>Class: {student.className}, Roll No: {student.rollNo}</div>
              <button onClick={() => approveStudent(student.username)}>
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingStudents;
