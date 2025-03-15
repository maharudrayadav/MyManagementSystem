import React from "react";

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">My Student APP</h2>
      </div>
      <div className="nav-right">
        <button className="nav-btn" onClick={() => setCurrentPage("home")}>Home</button>
        <button className="nav-btn" onClick={() => setCurrentPage("registration")}>Registration</button>
        <button className="nav-btn" onClick={() => setCurrentPage("allVendors")}>All Vendors</button>
        <button className="nav-btn" onClick={() => setCurrentPage("search")}>Search</button>
        <button className="nav-btn" onClick={() => setCurrentPage("ResultAddition")}>Result Addition</button>
        <button className="nav-btn" onClick={() => setCurrentPage("ResultShow")}>Result Show</button>
        <button className="nav-btn" onClick={() => setCurrentPage("FaceComponent")}>Face Component</button>
        <button className="nav-btn logout" onClick={() => {
          localStorage.removeItem("isAuthenticated");
          setCurrentPage("login");
        }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
