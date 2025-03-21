import React, { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Registration from "./Registration";
import AllVendors from "./AllVendors";
import SearchVendor from "./SearchVendor";
import ResultAddition from "./ResultAddition";
import ResultShow from "./ResultShow";
import FaceComponent from "./FaceComponent";
import PendingStudents from "./PendingStudents";
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

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setCurrentPage("home");
  };

  return (
    <div className="App">
      <Navbar
        isAuthenticated={isAuthenticated}
        handleMenuClick={handleMenuClick}
        handleLogout={handleLogout}
      />
      <div className="content">
        {/* ✅ Conditional Rendering */}
        {currentPage === "home" && <Home />}
        {currentPage === "login" && <Login setIsAuthenticated={setIsAuthenticated} />}
        {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}

        {/* ✅ Protected Pages (Only accessible if authenticated) */}
        {isAuthenticated ? (
          <>
            {currentPage === "registration" && <Registration />}
            {currentPage === "allVendors" && <AllVendors />}
            {currentPage === "search" && <SearchVendor />}
            {currentPage === "ResultAddition" && <ResultAddition />}
            {currentPage === "ResultShow" && <ResultShow />}
            {currentPage === "FaceComponent" && <FaceComponent />}
            {currentPage === "pending" && <PendingStudents />}
          </>
        ) : (
          currentPage !== "home" && (
            <p>Please log in to access this page.</p>
          )
        )}
      </div>
    </div>
  );
};

export default App;
