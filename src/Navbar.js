import React from "react";

const Navbar = ({ isAuthenticated, setCurrentPage, setIsAuthenticated }) => {
  const handleSignoff = async () => {
    try {
      const response = await fetch("YOUR_BACKEND_API/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        setCurrentPage("home"); // Redirect to Home after signoff
      } else {
        alert("Error during signoff.");
      }
    } catch (error) {
      console.error("Signoff error:", error);
      alert("Error during signoff.");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">My App</h2>
      </div>
      <div className="nav-right">
        <button className="nav-btn" onClick={() => setCurrentPage("home")}>
          Home
        </button>

        {/* Show Login & Signup before login */}
        {!isAuthenticated ? (
          <>
            <button className="nav-btn" onClick={() => setCurrentPage("login")}>
              Login
            </button>
            <button className="nav-btn" onClick={() => setCurrentPage("signup")}>
              Sign Up
            </button>
          </>
        ) : (
          <>
            {/* Show these only after login */}
            <button className="nav-btn" onClick={() => setCurrentPage("registration")}>
              Registration
            </button>
            <button className="nav-btn" onClick={() => setCurrentPage("allVendors")}>
              All Vendors
            </button>
            <button className="nav-btn" onClick={() => setCurrentPage("search")}>
              Search Vendor
            </button>
            <button className="nav-btn" onClick={() => setCurrentPage("ResultAddition")}>
              Result Addition
            </button>
            <button className="nav-btn" onClick={() => setCurrentPage("ResultShow")}>
              Result Show
            </button>
            <button className="nav-btn" onClick={() => setCurrentPage("FaceComponent")}>
              Face Component
            </button>
            <button className="nav-btn logout" onClick={handleSignoff}>
              Sign Off
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
