import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ResultShow = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        fetch("https://cloudvendor-production.up.railway.app/cloudvendor/cloudsets", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,  // Include JWT token
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch results. Authentication required.");
                }
                return res.json();
            })
            .then((data) => setResults(data))
            .catch((error) => {
                console.error("Error fetching results:", error);
                setError(error.message || "An error occurred.");
            });
    }, []);

    const generateStyledPDF = (result) => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Vendor Report", 14, 20);

        autoTable(doc, {
            startY: 40,
            head: [["Field", "Value"]],
            body: [
                ["Vendor ID", result.vendorId],
                ["Vendor Name", result.vendorName || "N/A"],
                ["Subject", result.subject || "N/A"],
                ["Marks", result.marks || "N/A"],
            ],
            theme: "striped",
            styles: { fontSize: 12 },
            headStyles: { fillColor: "#6a11cb" },
        });

        // Open PDF in a new tab
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    };

    return (
        <div className="result-show">
            <h1>Result Show</h1>

            {error && <p className="error-message">{error}</p>}

            <table className="result-table">
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
                                <button className="pdf-button" onClick={() => generateStyledPDF(result)}>
                                    Open PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultShow;
