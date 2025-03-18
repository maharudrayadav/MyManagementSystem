import React, { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import PendingStudents from "./PendingStudents";  // Import the new component
import Navbar from "./Navbar";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleMenuClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Navbar
        isAuthenticated={isAuthenticated}
        setCurrentPage={setCurrentPage}
        setIsAuthenticated={setIsAuthenticated}
        handleMenuClick={handleMenuClick}
      />
      <div className="content">
        {currentPage === "home" && <Home />}
        {currentPage === "login" && <Login setIsAuthenticated={setIsAuthenticated} />}
        {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
        {currentPage === "pending" && <PendingStudents />}  {/* Add pending students */}
      </div>
    </div>
  );
};

export default App;
