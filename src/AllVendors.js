import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import "./App.css";  // Import the CSS file

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in first.");
      return;
    }

    fetch("https://cloudvendor-1.onrender.com/cloudvendor", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized request");
        return res.json();
      })
      .then((data) => setVendors(data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!searchId.trim() || isNaN(searchId)) {
      setError("Please enter a valid numeric Vendor ID.");
      return;
    }

    try {
      const response = await fetch("https://cloudvendor-1.onrender.com/cloudvendor/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: parseInt(searchId, 10) }),
      });

      if (!response.ok) {
        throw new Error("Vendor not found or authentication failed");
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      setError(error.message || "An error occurred");
      setSearchResult(null);
    }
  };

  const handleImagePreview = (imageBase64) => {
    if (imageBase64) {
      const imageUrl = `data:image/png;base64,${imageBase64}`;
      const newTab = window.open();
      newTab.document.write(
        `<img src="${imageUrl}" alt="Vendor Image" style="max-width:100%; height:auto;">`
      );
    } else {
      alert("No image available");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Vendors</h1>

        {/* Search Section */}
        <div className="flex items-center gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex w-full md:w-1/2">
            <input
              type="text"
              placeholder="Enter Vendor ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              required
              className="flex-1 p-3 border rounded-l-lg outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Search Result Table */}
        {searchResult && (
          <div className="table-container mb-8">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Search Result:</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{searchResult.vendorId}</td>
                  <td>{searchResult.vendorName}</td>
                  <td>{searchResult.vendorAddress}</td>
                  <td>{searchResult.vendorPhoneNumber}</td>
                  <td className="action-cell">
                    {searchResult?.vendorImage ? (
                      <Eye
                        className="eye-icon"
                        onClick={() => handleImagePreview(searchResult.vendorImage)}
                      />
                    ) : (
                      <span className="no-image">No Image</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* All Vendors Table */}
        <div className="table-container">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">All Vendors</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index}>
                  <td>{vendor.vendorId}</td>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.vendorAddress}</td>
                  <td>{vendor.vendorPhoneNumber}</td>
                  <td className="action-cell">
                    {vendor.vendorImage ? (
                      <Eye
                        className="eye-icon"
                        onClick={() => handleImagePreview(vendor.vendorImage)}
                      />
                    ) : (
                      <span className="no-image">No Image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllVendors;
