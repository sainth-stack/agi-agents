import React, { useState } from "react";
import "./Footer.css";
import axios from "axios"; // Import Axios

export default function Footer() {
  const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async () => {
    try {
      // Create FormData and append email to it
      const formData = new FormData();
      formData.append("email", email);

      // Make the POST request using axios
      const response = await axios.post(
        `http://13.215.228.42:4001/api/add_email`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct header for formData
          },
        }
      );

      // Check if the request was successful
      if (response.status === 201) {
        alert("Subscription successful!");
      } else {
        alert("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="footer mt-4 w-[100%]">
      <div>
        <h3>AI Agents Hub</h3>
        <p>Enter To World of Collected List Of 100+ Ai Agents</p>
      </div>
      <div>
        <div className="input-group mb-4">
          <input
            className="Email"
            type="text"
            id="Email"
            placeholder="Enter Your Email"
            aria-label="Enter Your Email"
            aria-describedby="basic-addon2"
            value={email} // Controlled input field
            onChange={handleEmailChange} // Update state on change
          />
          <span className="button" onClick={handleSubscribe}>
            Subscribe
          </span>
        </div>
      </div>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
}
