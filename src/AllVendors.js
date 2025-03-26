import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const token = localStorage.getItem("token"); // Get token from storage

  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in first.");
      return;
    }

    fetch("https://cloudvendor-1.onrender.com/cloudvendor", {
      method: "GET",
      headers: {
        Authorization: Bearer ${token},
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized request");
        return res.json();
      })
      .then((data) => setVendors(data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, [token]);

  return (
    <div className="page all-vendors">
      <h1>All Vendors</h1>
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
          {vendors.map((vendor, index) => (
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
                      const imageUrl = data:image/png;base64,${vendor.vendorImage};
                      const newTab = window.open();
                      newTab.document.write(
                        <img src="${imageUrl}" alt="Vendor Image" style="max-width:100%; height:auto;">
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllVendors
