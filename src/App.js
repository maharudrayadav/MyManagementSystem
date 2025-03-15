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

  return (
    <div className="App">
      <Navbar
        isAuthenticated={isAuthenticated}
        setCurrentPage={setCurrentPage}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="content">
        {currentPage === "home" && <Home />}
        {currentPage === "login" && <Login setIsAuthenticated={setIsAuthenticated} />}
        {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}

        {/* Show other pages only after login */}
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
