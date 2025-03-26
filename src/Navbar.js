import React from "react";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, handleMenuClick, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleMenuClick("home")}>
        🌩️ Cloud Vendor
      </div>

      <div className="navbar-links">
        <button className="nav-btn primary" onClick={() => handleMenuClick("home")}>Home</button>

        {isAuthenticated ? (
          <>
            <button className="nav-btn success" onClick={() => handleMenuClick("registration")}>Registration</button>
            <button className="nav-btn info" onClick={() => handleMenuClick("allVendors")}>All Vendors</button>
            <button className="nav-btn warning" onClick={() => handleMenuClick("search")}>Search</button>
            <button className="nav-btn secondary" onClick={() => handleMenuClick("ResultAddition")}>Add Result</button>
            <button className="nav-btn info" onClick={() => handleMenuClick("ResultShow")}>Show Result</button>
            <button className="nav-btn success" onClick={() => handleMenuClick("FaceComponent")}>Face Component</button>
            <button className="nav-btn warning" onClick={() => handleMenuClick("pending")}>Pending Students</button>

            <button className="nav-btn logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="nav-btn secondary" onClick={() => handleMenuClick("login")}>Login</button>
            <button className="nav-btn success" onClick={() => handleMenuClick("signup")}>Signup</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
