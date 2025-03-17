import React from "react";

const Navbar = ({ isAuthenticated, setCurrentPage, setIsAuthenticated, handleMenuClick }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    setCurrentPage("home"); // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <ul className="horizontal-menu">
        <li onClick={() => handleMenuClick("home")}>Home</li>
        {!isAuthenticated && <li onClick={() => handleMenuClick("login")}>Login</li>}
        {!isAuthenticated && <li onClick={() => handleMenuClick("signup")}>Signup</li>}
        {isAuthenticated && (
          <>
            <li onClick={() => handleMenuClick("registration")}>Registration</li>
            <li onClick={() => handleMenuClick("allVendors")}>All Vendors</li>
            <li onClick={() => handleMenuClick("search")}>Search Vendor</li>
            <li onClick={() => handleMenuClick("ResultAddition")}>Result Addition</li>
            <li onClick={() => handleMenuClick("ResultShow")}>Result Show</li>
            <li onClick={() => handleMenuClick("FaceComponent")}>Face Component</li>
            <li onClick={handleLogout}>Logout</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
