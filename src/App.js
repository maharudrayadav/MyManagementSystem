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
import Navbar from "./Navbar";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("home"); // Default to Home

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
        handleMenuClick={handleMenuClick} // Pass the function to handle menu clicks
      />
      <div className="content">
        {/* Render pages based on current page and authentication status */}
        {currentPage === "home" && <Home />}
        {currentPage === "login" && <Login setIsAuthenticated={setIsAuthenticated} />}
        {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
        {isAuthenticated && (
          <>
            {currentPage === "registration" && <Registration />}
            {currentPage === "allVendors" && <AllVendors />}
            {currentPage === "search" && <SearchVendor />}
            {currentPage === "ResultAddition" && <ResultAddition />}
            {currentPage === "ResultShow" && <ResultShow />}
            {currentPage === "FaceComponent" && <FaceComponent />}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
