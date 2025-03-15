import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import AllVendors from "./components/AllVendors";
import SearchVendor from "./components/SearchVendor";
import ResultAddition from "./components/ResultAddition";
import ResultShow from "./components/ResultShow";
import FaceComponent from "./components/FaceComponent";
import Navbar from "./components/Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    setCurrentPage(localStorage.getItem("isAuthenticated") ? "home" : "login");
  }, []);

  return (
    <div className="App">
      {isAuthenticated && <Navbar setCurrentPage={setCurrentPage} />}
      <div className="content">
        {currentPage === "login" && <Login onLoginSuccess={() => setIsAuthenticated(true)} />}
        {currentPage === "home" && <Home />}
        {currentPage === "registration" && <Registration />}
        {currentPage === "allVendors" && <AllVendors />}
        {currentPage === "search" && <SearchVendor />}
        {currentPage === "ResultAddition" && <ResultAddition />}
        {currentPage === "ResultShow" && <ResultShow />}
        {currentPage === "FaceComponent" && <FaceComponent />}
      </div>
    </div>
  );
};

export default App;
