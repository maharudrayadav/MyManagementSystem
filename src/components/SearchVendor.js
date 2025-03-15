import React, { useState } from "react";
import { Eye } from "lucide-react";

const SearchVendor = () => {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parseInt(searchId, 10) }),
      });

      if (!response.ok) {
        throw new Error("Vendor not found");
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      setError(error.message || "An error occurred");
      setSearchResult(null);
    }
  };

  return (
    <div className="page search">
      <h1>Search Vendor</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Vendor ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {searchResult && (
        <div className="search-result">
          <h3>Search Result:</h3>
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
                <td>
                  <Eye
                    className="eye-icon"
                    onClick={() => {
                      if (searchResult?.vendorImage) {
                        const imageUrl = `data:image/png;base64,${searchResult.vendorImage}`;
                        const newTab = window.open();
                        newTab.document.write(`<img src="${imageUrl}" alt="Vendor Image" style="max-width:100%; height:auto;">`);
                      } else {
                        alert("No image available");
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchVendor;
