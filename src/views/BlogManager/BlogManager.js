import React, { useState } from "react";
import axios from "axios";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Manager.css";

const BlogManager = () => {
  // State variables to store user input
  const [apiKey, setApiKey] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle visibility
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [option, setOption] = useState(""); // To store selected option
  const [blogContent, setBlogContent] = useState("");
  const [topic, setTopic] = useState(""); // To store the topic

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!apiKey || !websiteUrl || !topic) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Create FormData object and append the required fields with the correct keys
      const formData = new FormData();
      formData.append("api_key", apiKey); // OpenAI API key
      formData.append("option", option); // Selected option
      formData.append("url", websiteUrl); // Website URL
      formData.append("topic", topic); // Topic

      // Make API request to generate content
      const response = await axios.post(
        "http://127.0.0.1:8000/api/generate-content/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to FormData
          },
        }
      );

      // Set the blog content from API response
      setBlogContent(response.data.content); // Adjust based on the backend response
    } catch (error) {
      console.error("Error fetching blog content:", error);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the visibility
  };

  return (
    <div className="blog-manager-container">
      <h1 className="title">Blog Manager</h1>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Enter OpenAI API Key:</label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              style={{ paddingRight: "40px" }} // Add space for the icon
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                marginTop: "5px",
                cursor: "pointer",
                color: "#333",
              }}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash" />
              ) : (
                <i className="fas fa-eye" />
              )}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Select One:</label>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="website-blog">Website URL to Blog</option>
            <option value="youtube-blog">YouTube URL to Blog</option>
            <option value="video-audio-blog">Video/Audio to Blog</option>
            <option value="website-video">Website URL to Video Script</option>
          </select>
        </div>

        <div className="form-group">
          <label>Enter A Topic:</label>
          <input
            style={{ width: "95%" }}
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Enter a Website URL:</label>
          <input
            style={{ width: "95%" }}
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="generate-btn">
          Generate Blog
        </button>
      </form>

      {/* Display the generated blog content */}
      {blogContent && (
        <div className="blog-output">
          <h2>Generated Blog Content</h2>
          <p>{blogContent}</p>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
