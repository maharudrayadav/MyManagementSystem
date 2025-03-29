import React, { useState, useEffect } from "react";
import { Eye, Search } from "lucide-react";

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in first.");
      return;
    }

    fetch("https://cloudvendor-production.up.railway.app/cloudvendor", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized request");
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
        setIsLoading(false); // Stop loading even on error
      });
  }, [token]);

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendorId.toString().includes(searchTerm)
  );

  return (
    <div className="page all-vendors">
      <h1>All Vendors</h1>

      {/* Search Input */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        />
        <Search size={24} color="#555" />
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>View Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor, index) => (
              <tr key={index}>
                <td>{vendor.vendorId}</td>
                <td>{vendor.vendorName}</td>
                <td>{vendor.vendorAddress}</td>
                <td>{vendor.vendorPhoneNumber}</td>
                <td>
                  {vendor.vendorImage && (
                    <Eye
                      className="eye-icon"
                      onClick={() => {
                        const imageUrl = `data:image/png;base64,${vendor.vendorImage}`;
                        const newTab = window.open();
                        newTab.document.write(`
                          <html>
                            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
                              <img src="${imageUrl}" alt="Vendor Image" style="max-width:100%; height:auto;">
                            </body>
                          </html>
                        `);
                        newTab.document.close();
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Spinner CSS */}
      <style>
        {`
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60vh;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(128, 0, 128, 0.2); /* Light Purple */
            border-radius: 50%;
            border-top: 5px solid purple; /* Dark Purple */
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AllVendors;
