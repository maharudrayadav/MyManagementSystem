import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, setCurrentPage, setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    setCurrentPage("home"); // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setCurrentPage("home")}>
        <h1>MyPlatform</h1>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setCurrentPage("home")}>Home</li>

        {!isAuthenticated ? (
          <>
            <li onClick={() => setCurrentPage("login")}>Login</li>
            <li onClick={() => setCurrentPage("signup")}>Signup</li>
          </>
        ) : (
          <>
            <li onClick={() => setSubmenu(submenu === "vendors" ? null : "vendors")}>
              Vendors ⬇
              {submenu === "vendors" && (
                <ul className="dropdown">
                  <li onClick={() => setCurrentPage("allVendors")}>All Vendors</li>
                  <li onClick={() => setCurrentPage("search")}>Search Vendor</li>
                </ul>
              )}
            </li>
            <li onClick={() => setSubmenu(submenu === "results" ? null : "results")}>
              Results ⬇
              {submenu === "results" && (
                <ul className="dropdown">
                  <li onClick={() => setCurrentPage("ResultAddition")}>Add Result</li>
                  <li onClick={() => setCurrentPage("ResultShow")}>Show Results</li>
                </ul>
              )}
            </li>
            <li onClick={() => setCurrentPage("registration")}>Registration</li>
            <li onClick={() => setCurrentPage("FaceComponent")}>Face Component</li>
            <li className="logout-btn" onClick={handleLogout}>Logout</li>
          </>
        )}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <li onClick={() => setCurrentPage("home")}>Home</li>
          {!isAuthenticated ? (
            <>
              <li onClick={() => setCurrentPage("login")}>Login</li>
              <li onClick={() => setCurrentPage("signup")}>Signup</li>
            </>
          ) : (
            <>
              <li onClick={() => setCurrentPage("allVendors")}>All Vendors</li>
              <li onClick={() => setCurrentPage("search")}>Search Vendor</li>
              <li onClick={() => setCurrentPage("ResultAddition")}>Add Result</li>
              <li onClick={() => setCurrentPage("ResultShow")}>Show Results</li>
              <li onClick={() => setCurrentPage("registration")}>Registration</li>
              <li onClick={() => setCurrentPage("FaceComponent")}>Face Component</li>
              <li className="logout-btn" onClick={handleLogout}>Logout</li>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
