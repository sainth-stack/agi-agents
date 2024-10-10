import React, { useState } from "react";
import "./SyntheticPanel.css"; // Ensure this stylesheet is correctly linked.
//import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome for icons
import * as XLSX from "xlsx";
import axios from "axios";
const SyntheticDataGenerator = () => {
  // State variables
  const [apiKey, setApiKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store selected file in state
    }
  };

  // Handle change in the number of rows
  const handleRowsChange = (increment) => {
    setRows((prev) => {
      if (increment && prev < 1000) return prev + 1; // Max 1000 rows
      if (!increment && prev > 1) return prev - 1; // Min 1 row
      return prev; // Return current value if bounds are reached
    });
  };

  // Handle form submission
  // Add the import if using npm
  // import * as XLSX from "xlsx";


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Show loading state
    setError(""); // Reset error message

    if (!file) {
      setError("Please upload a file."); // Ensure a file is uploaded
      setLoading(false);
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("api_key", apiKey);
    formData.append("uploaded_file", file);
    formData.append("num_rows", rows);

    try {
      // Make a POST request with axios
      const response = await axios.post("http://127.0.0.1:8000/api/generate-data/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'text', // Expect response as text (CSV-like)
      });

      console.log(response);

      const responseData = JSON.parse(response?.data)?.data
      console.log(responseData);

      // Parse CSV-like text into a 2D array
      const csvRows = responseData.split("\n").map((row) => row.split(","));

      // Create a new workbook and worksheet using SheetJS
      const ws = XLSX.utils.aoa_to_sheet(csvRows); // Convert 2D array into sheet
      const wb = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(wb, ws, "Generated Data"); // Append the sheet to workbook

      // Export to Excel file
      const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelFile], { type: "application/octet-stream" });

      // Download the Excel file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_data.xlsx"; // Set the filename
      document.body.appendChild(a);
      a.click(); // Trigger the download
      a.remove(); // Clean up the DOM

      console.log("Excel file downloaded successfully.");

    } catch (err) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Hide loading state
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle visibility
  };

  return (
    <div className="container  p-3 bg-slate-50 shadow-md">
      <h1>Synthetic Data Generator</h1>
      <form onSubmit={handleSubmit}>
        {/* API Key Input */}
        <div className="input-group group">
          <label className="fw-semibold text-lg">Enter your OpenAI API key:</label>
          <div className="form-group">
            <div style={{ position: "relative" }} className="">
              <input
                type={showPassword ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)} // Update API key state
                required
                placeholder="API Key"
                className=" -p-3  h-10 mx-3  shadow-sm bg-white"
              />
              <span
                onClick={togglePasswordVisibility} // Toggle password visibility
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "26px",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                {showPassword ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
              </span>
            </div>
          </div>
        </div>

        {/* File Upload Input */}
        <div className="input-group">
          <label>Upload an Excel file:</label>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange} // Handle file selection
            id="file-upload"
            style={{ display: "none" }} // Hide default input
          />
          <label htmlFor="file-upload " className="file-upload-label fw-semibold ">
            Drag and drop file here
            <br />
            <span style={{ padding: "30px", paddingTop: "20px" }} className="fw-semibold ">
              Limit 200MB per file • XLSX
            </span>
          </label>
          {file && <p>File selected: {file.name}</p>} {/* Show selected file name */}
        </div>

        {/* Row Count Control */}
        <div className="input-group">
          <label className="text-lg fw-semibold ">Number of rows to generate:</label>
          <div className="row-control">
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))} // Update row count
              className=" -p-3  h-10 mx-3 text-balance  shadow-md outline-none border-collapse bg-white rounded-md "

              min={1} // Prevent invalid input
              max={1000} // Prevent exceeding max
            />
            <button type="button" onClick={() => handleRowsChange(false)} className="bg-black font-medium p-2 -m-1 shadow-md">-</button>
            <button type="button" onClick={() => handleRowsChange(true)} className="bg-black font-medium p-2 -m-1 shadow-md">+</button>
          </div>
        </div>

        {/* Error Message Display */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Generating..." : "Generate Data"}
        </button>
      </form>
    </div>
  );
};

export default SyntheticDataGenerator;
