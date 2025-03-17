import React from "react";

const Navbar = ({ isAuthenticated, setCurrentPage, setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    setCurrentPage("home"); // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <ul className="horizontal-menu">
        <li onClick={() => setCurrentPage("home")} style={{ cursor: "pointer" }}>Home</li>
        {!isAuthenticated && (
          <>
            <li onClick={() => setCurrentPage("login")} style={{ cursor: "pointer" }}>Login</li>
            <li onClick={() => setCurrentPage("signup")} style={{ cursor: "pointer" }}>Signup</li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li onClick={() => setCurrentPage("registration")} style={{ cursor: "pointer" }}>Registration</li>
            <li onClick={() => setCurrentPage("allVendors")} style={{ cursor: "pointer" }}>All Vendors</li>
            <li onClick={() => setCurrentPage("search")} style={{ cursor: "pointer" }}>Search Vendor</li>
            <li onClick={() => setCurrentPage("ResultAddition")} style={{ cursor: "pointer" }}>Result Addition</li>
            <li onClick={() => setCurrentPage("ResultShow")} style={{ cursor: "pointer" }}>Result Show</li>
            <li onClick={() => setCurrentPage("FaceComponent")} style={{ cursor: "pointer" }}>Face Component</li>
            <li onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>Logout</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
