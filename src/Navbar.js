import React from "react";
import "./App.css";

const Navbar = ({ isAuthenticated, handleMenuClick, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleMenuClick("home")}>
        Cloud Vendor
      </div>

      <div className="navbar-links">
        <button onClick={() => handleMenuClick("home")}>Home</button>

        {/* ✅ Conditional Rendering */}
        {isAuthenticated ? (
          <>
            <button onClick={() => handleMenuClick("registration")}>Registration</button>
            <button onClick={() => handleMenuClick("allVendors")}>All Vendors</button>
            <button onClick={() => handleMenuClick("search")}>Search</button>
            <button onClick={() => handleMenuClick("ResultAddition")}>Add Result</button>
            <button onClick={() => handleMenuClick("ResultShow")}>Show Result</button>
            <button onClick={() => handleMenuClick("FaceComponent")}>Face Component</button>
            <button onClick={() => handleMenuClick("pending")}>Pending Students</button>
            
            {/* ✅ Logout button */}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => handleMenuClick("login")}>Login</button>
            <button onClick={() => handleMenuClick("signup")}>Signup</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
