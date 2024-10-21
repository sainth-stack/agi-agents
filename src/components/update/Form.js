import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Delete from "./Delete";
import PrepLoader from "../prep-loader/loader";
export default function UpdatePage() {
  const [formData, setFormData] = useState({
    tagline: "",
    likes: "",
    overview: "",
    key_features: "",
    use_cases: "",
    created_by: "",
    access: "",
    tags: "",
    preview_image: "",
    demo_video: "",
    email: "",
    logo: "",
    pricing: "",
    category: "",
    industry: "",
    description: "",
    name: "",
    website_url: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = "dnrvz201s"; // Replace with your Cloudinary cloud name
    const uploadPreset = "cfbnzkaa"; // Replace with your Cloudinary upload preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return response.data.secure_url; // Cloudinary URL of the uploaded image
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleCreate = async (e) => {
    console.log("heyuu");
    e.preventDefault();

    const formBody = new FormData();
    Object.keys(formData).forEach((key) => {
      formBody.append(key, formData[key]);
    });
    setIsLoading(true);
    try {
      const logoUrl = await uploadToCloudinary(formData.logo);
      // const previewImageUrl = await uploadToCloudinary(formData.preview_image);

      // Update formData with Cloudinary URLs
      const updatedFormData = {
        ...formData,
        logo: logoUrl,
        // preview_image: previewImageUrl,
      };
      const agentId = getAgentIdFromURL();
      const response = await axios.post(
        `http://13.215.228.42:4001//api/agent/${agentId}/modify/`,
        updatedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);
      alert("successfully completed."); // You can customize this message
      // if (response.data === "Success") {
      //   localStorage.setItem("user-email", formData.email);
      //   window.open("index3.html");
      // } else {
      //   alert("Please enter the correct data!");

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while Updating the form.");
    } finally {
      setIsLoading(false); // End loading
    }
  };
  const getAgentIdFromURL = () => {
    const url = window.location.href;

    const id = url.split("/"); // Split the URL at the '?' and get the part after it
    console.log(id[4]);
    return id[4]; // Return the ID directly
  };

  const agentId = getAgentIdFromURL();

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await fetch(
          `http://13.215.228.42:4001//api/agents_detail/${agentId}`
        );
        const data = await response.json();
        const finalData = {
          ...data?.agent,
          access: data?.agent?.details?.access,

          category: data?.agent?.details?.category,
          created_by: data?.agent?.details?.created_by,
          industry: data?.agent?.details?.industry,
          pricing: data?.agent?.details?.pricing,
        };
        setFormData(finalData);
      } catch (error) {
        console.error("Error fetching agent update:", error);
      }
    };

    fetchAgentDetails();
  }, []);
  console.log(formData);

  // if (!logo) return null;

  // // Use URL.createObjectURL to display the image
  // const logoURL = URL.createObjectURL(  logo);

  // return(
  //   logoURL

  // )
  //   };

  return (
    <div className="card" class="card" name="UpdatePage">
      <div>
        <div className="main-container">
          <div className="Submit">
            <h1>Update AI agent </h1>
            <p>
              {" "}
              Free submition Reivew and approval with in 24 hours.
              <br />
              Gain visibility,attract new users,and reciew valuable feedback by
              showcasing your AI Agent.
            </p>
            <div></div>
          </div>
        </div>
        <div className="input-container">
          <div style={{ width: "50%" }}>
            <label className="hi" for="Ai Agent">
              AI Agent Name <span className="star">*</span>
            </label>
            <div className="wordCount">{formData?.name?.length}/35</div>

            <input
              className="container"
              type="text"
              class="form-control"
              name="name"
              value={formData?.name}
              id="floatingInputGrid"
              placeholder="Enter AI Agent Name"
              onChange={handleChange}
              required // This makes the field mandatory
            />
          </div>
          <div style={{ width: "50%" }}>
            <label className="hi" for="Ai Agent">
              Created By <span className="star">*</span>
            </label>
            <div className="wordCount">{formData?.created_by?.length}/50</div>
            <input
              className="container"
              type="text"
              class="form-control"
              name="created_by"
              value={formData?.created_by}
              id="floatingInputGrid"
              onChange={handleChange}
              required // This makes the field mandatory
              placeholder="Enter Creater name"
            />
          </div>
        </div>
        <div className="input-container2">
          <div style={{ width: "50%" }}>
            <label className="hi" for="Ai Agent">
              Website URL <span className="star">*</span>
            </label>
            <div className="wordCount">{formData?.website_url?.length}/100</div>
            <input
              className="container"
              type="text"
              class="form-control"
              value={formData?.website_url}
              name="website_url"
              onChange={handleChange}
              required // This makes the field mandatory
              id="floatingInputGrid"
              placeholder="Enter Website URL or github Url"
            />
          </div>
          <div style={{ width: "50%" }}>
            <label className="hi" for="Ai Agent">
              Contact Email
            </label>
            <div className="wordCount">{formData?.email?.length}/50</div>

            <input
              className="container"
              type="email"
              value={formData?.email}
              onChange={handleChange}
              name="email"
              class="form-control"
              id="floatingInputGrid"
              placeholder="Enter Email"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="check-box1">
          <div>
            <label className="hi" htmlFor="accessModel">
              Access Model <span className="star">*</span>
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="access"
                id="flexRadioDefault1"
                value="Open Source"
                checked={formData?.access === "Open Source"}
                onChange={handleChange}
                required // This makes the field mandatory
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Open Source
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="access"
                id="flexRadioDefault2"
                value="Closed Source"
                checked={formData?.access === "Closed Source"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Closed Source
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="access"
                id="flexRadioDefault3"
                value="API"
                checked={formData?.access === "API"}
                onChange={handleChange}
                required // This makes the field mandatory
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                API
              </label>
            </div>
          </div>
          <br />
          <div>
            <label className="hi" htmlFor="pricingModel">
              Pricing Model <span className="star">*</span>
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="pricing"
                id="flexRadioDefault4"
                value="Free"
                checked={formData?.pricing === "Free"}
                onChange={handleChange}
                required // This makes the field mandatory
              />
              <label className="form-check-label" htmlFor="flexRadioDefault4">
                Free
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="pricing"
                id="flexRadioDefault5"
                value="Freemium"
                checked={formData?.pricing === "Freemium"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault5">
                Freemium
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="pricing"
                id="flexRadioDefault6"
                value="Paid"
                checked={formData?.pricing === "Paid"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault6">
                Paid
              </label>
            </div>
          </div>
        </div>

        <div className="check-box2">
          <div>
            <label className="hi" htmlFor="category">
              Category <span className="star">*</span>
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault7"
                value="Personal Assistant"
                checked={formData?.category === "Personal Assistant"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault7">
                Personal Assistant
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault8"
                value="Data Analysis"
                checked={formData?.category === "Data Analysis"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault8">
                Data Analysis
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault9"
                value="Research"
                checked={formData?.category === "Research"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault9">
                Research
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault10"
                value="Digital Workers"
                checked={formData?.category === "Digital Workers"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault10">
                Digital Workers
              </label>
            </div>
          </div>
          <br />
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault11"
                value="Productivity"
                checked={formData?.category === "Productivity"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault11">
                Productivity
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault12"
                value="customerService"
                checked={formData?.category === "Customer Service"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault12">
                Customer Service
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault13"
                value="Transition"
                checked={formData?.category === "Transition"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault13">
                Transition
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault14"
                value="AI Agents Builder"
                checked={formData?.category === "AI Agents Builder"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault14">
                AI Agents Builder
              </label>
            </div>
          </div>
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault15"
                value="Content Creation"
                checked={formData?.category === "Content Creation"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault15">
                Content Creation
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault16"
                value="Coding"
                checked={formData?.category === "Coding"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault16">
                Coding
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault17"
                value="WorkFlow"
                checked={formData.category === "WorkFlow"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault17">
                WorkFlow
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="flexRadioDefault18"
                value="Other"
                checked={formData?.category === "Other"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault18">
                Other
              </label>
            </div>
          </div>
        </div>

        <div className="check-box3">
          <div>
            <label className="hi" htmlFor="industry">
              Industry <span className="star">*</span>
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault19"
                value="Fintech"
                checked={formData?.industry === "Fintech"}
                onChange={handleChange}
                required // This makes the field mandatory
              />
              <label className="form-check-label" htmlFor="flexRadioDefault19">
                Fintech
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault20"
                value="Healthcare"
                checked={formData?.industry === "Healthcare"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault20">
                Healthcare
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault21"
                value="Retail"
                checked={formData?.industry === "Retail"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault21">
                Retail
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault22"
                value="Education"
                checked={formData?.industry === "Education"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault22">
                Education
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault23"
                value="Transportation"
                checked={formData?.industry === "Transportation"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault23">
                Transportation
              </label>
            </div>
          </div>
          <br />
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault24"
                value="Government"
                checked={formData?.industry === "Government"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault24">
                Government
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault25"
                value="Agriculture"
                checked={formData?.industry === "Agriculture"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault25">
                Agriculture
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault26"
                value="Media"
                checked={formData?.industry === "Media"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault26">
                Media
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault27"
                value="E-commerce"
                checked={formData?.industry === "E-commerce"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault27">
                E-commerce
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="industry"
                id="flexRadioDefault27"
                value="Legal"
                checked={formData?.industry === "Legal"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault27">
                Legal
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="tagline">
        <p>
          <label className="hi">
            Tagline <span className="star">*</span>
          </label>
          <div className="wordCount1">{formData?.tagline?.length}/50</div>
        </p>
        <textarea
          id="tagline"
          placeholder="This is used on your AI Agent card."
          rows="3"
          onChange={handleChange}
          name="tagline"
          value={formData?.tagline}
        ></textarea>
      </div>

      <div>
        <label className="hi1">
          Description <span className="star">*</span>
        </label>

        <div className="wordCount1">{formData?.description?.length}/750</div>
        <textarea
          id="discription"
          placeholder="Briefly describe your AI Agent, the description is used on your AI Agent page ."
          name="description"
          rows="7"
          cols="90"
          onChange={handleChange}
          value={formData?.description}
          required // This makes the field mandatory
        ></textarea>
      </div>

      <div>
        <label className="hi1">Key Features</label>
        <textarea
          id="tagline"
          placeholder="Eneter  comma-seperated features of your AI Agent"
          name="key_features"
          rows="5"
          cols="90"
          onChange={handleChange}
          value={formData?.key_features}
        ></textarea>
      </div>

      {/* <div>
        <label className="hi">Use Cases</label>
        <textarea id="tagline" placeholder="Enter  comma-seperated use cases for your AI Agent " rows="4" cols="90" name="use_cases" onChange={handleChange}
        >
        </textarea>
      </div> */}

      <div className="input-container">
        {/* <div style={{ width: "100%" }}>
          <label className="hi" for="Ai Agent">
            Tags
          </label>

          <textarea
            rows={3}
            className="container"
            type="email"
            name="tag"
            class="form-control"
            id="tagline"
            value={formData?.tag}
            placeholder="Enter comma-seperated tags."
            onChange={handleChange}
          />
            

      </div> */}
        <div className="ai-agent-input-container">
          <div className="ai-agent-input-group">
            <label className="ai-agent-label" htmlFor="logo">
              AI Agent Logo <span className="star">*</span> (URL)
            </label>
            <input
              className="ai-agent-input"
              type="file" // Change to file input for image upload
              id="logo"
              name="logo"
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.files[0] })
              }
              required // This makes the field mandatory
            />
          </div>
        </div>
        {/* <div className="ai-agent-input-group">
          <label className="ai-agent-label" htmlFor="preview_image">
            AI Agent Screenshot   <span className="star">*</span> (URL)
          </label>
          <input
            className="ai-agent-input"
            type="file" // Change to file input for image upload
            id="preview_image"
            name="preview_image"
            onChange={(e) =>
              setFormData({ ...formData?, preview_image: e.target.files[0] })
            }
          />
        </div>  */}
        <div>
          <h3>Uploaded AI Agent Logo:</h3>
          <img
            src={formData?.logo}
            alt="AI Agent Logo"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      </div>
      <div className="input-container">
        <div style={{ width: "100%" }}>
          <label className="hi" for="Ai Agent">
            Video URL
          </label>

          <input
            className="container"
            type="email"
            class="form-control"
            id="Youtube"
            name="demo_video"
            value={formData?.demo_video}
            placeholder="Enter a YouTube or Video URL."
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="total-buttons">
        <button
          className="w-fit bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => handleCreate(e)}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Submitting..." : "Submit AI Agent"}{" "}
          {/* Change button text */}
        </button>

        <Delete agentId={agentId} />
      </div>

      {isLoading && (
        <div className="loader">
          <PrepLoader />
        </div> // Display loader when loading
      )}
    </div>
  );
}
