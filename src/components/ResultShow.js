import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Eye } from "lucide-react";

const ResultShow = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://cloudvendor-1.onrender.com/cloudvendor/cloudsets")
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching results:", error));
  }, []);

  const generateStyledPDF = (result) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Vendor Report", 14, 20);

    autoTable(doc, {
      startY: 40,
      body: [
        ["Vendor ID", result.vendorId],
        ["Vendor Name", result.vendorName || "N/A"],
        ["Subject", result.subject || "N/A"],
        ["Marks", result.marks || "N/A"],
      ],
      theme: "grid",
    });

    doc.save("vendor_report.pdf");
  };

  return (
    <div className="page result-show">
      <h1>Result Show</h1>
      <table>
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Vendor PDF</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.vendorId}</td>
              <td>{result.subject || "N/A"}</td>
              <td>{result.marks || "N/A"}</td>
              <td>
                <Eye className="eye-icon" onClick={() => generateStyledPDF(result)} style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultShow;
