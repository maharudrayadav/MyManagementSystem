import React, { useState, useEffect } from "react";
import { Eye, Search } from "lucide-react";
import "./App.css";  // Include for global styles

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Vendors</h1>

        {/* Search Section */}
        <div className="flex items-center gap-4 mb-6">
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm w-full md:w-1/2"
          >
            <input
              type="text"
              placeholder="Enter Vendor ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              required
              className="flex-1 p-3 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Search Result Section */}
        {searchResult && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Search Result:</h3>

            {/* Stylish Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl">
                <h4 className="text-lg font-semibold text-gray-800">Vendor Details</h4>
                <p className="text-gray-600"><strong>ID:</strong> {searchResult.vendorId}</p>
                <p className="text-gray-600"><strong>Name:</strong> {searchResult.vendorName}</p>
                <p className="text-gray-600"><strong>Address:</strong> {searchResult.vendorAddress}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {searchResult.vendorPhoneNumber}</p>
                {searchResult?.vendorImage && (
                  <div className="mt-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        const imageUrl = `data:image/png;base64,${searchResult.vendorImage}`;
                        const newTab = window.open();
                        newTab.document.write(`<img src="${imageUrl}" alt="Vendor Image" style="max-width:100%; height:auto;">`);
                      }}
                    >
                      View Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100 text-blue-700">
                    <th className="p-3 border">ID</th>
                    <th className="border">Name</th>
                    <th className="border">Address</th>
                    <th className="border">Phone</th>
                    <th className="border">View Image</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100 transition">
                    <td className="p-3 border">{searchResult.vendorId}</td>
                    <td className="border">{searchResult.vendorName}</td>
                    <td className="border">{searchResult.vendorAddress}</td>
                    <td className="border">{searchResult.vendorPhoneNumber}</td>
                    <td className="border">
                      <Eye
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => {
                          const imageUrl = `data:image/png;base64,${searchResult.vendorImage}`;
                          const newTab = window.open();
                          newTab.document.write(`<img src="${imageUrl}" alt="Vendor Image" style="max-width:100%; height:auto;">`);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vendors Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>View Image</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">{vendor.vendorId}</td>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.vendorAddress}</td>
                  <td>{vendor.vendorPhoneNumber}</td>
                  <td>
                    {vendor.vendorImage && (
                      <Eye
                        className="text-green-500 hover:text-green-700 cursor-pointer"
                        onClick={() => {
                          const imageUrl = `data:image/png;base64,${vendor.vendorImage}`;
                          const newTab = window.open();
                          newTab.document.write(
                            `<img src="${imageUrl}" alt="Vendor Image" style="max-width:100%; height:auto;">`
                          );
                        }}
                      />
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
