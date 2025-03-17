import React, { useState } from 'react';
import './index.css'; // Importing the CSS file
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../../const';

const Bot = ({agentDetails,handleFileChange,uploadedFileNames}) => {
  console.log(agentDetails)
  const fileInputRef = React.useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' ,margin:'8px 12px',borderRadius:'20px'}}>
    <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{agentDetails?.name || "Welcome to AI World"}</h1>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {uploadedFileNames && <span style={{ color: '#4b5563' }}>Selected file: {uploadedFileNames}</span>}
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer', border: 'none' }}
        onClick={handleUploadClick}
      >
        <FaCloudUploadAlt style={{ fontSize: '1.25rem' }} /> Upload File
      </button>
    </div>
  </div>
  );
};

export default Bot;
