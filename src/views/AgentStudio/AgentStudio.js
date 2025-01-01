import React, { useState, useEffect } from "react";
import TextInput from "../../components/Inputs/TextInput";
import TextAreaInput from "../../components/TextArea/TextAreaInput";
import SelectInput from "../../components/Select/SelectInput";
import SwitchInput from "../../components/switch";
import ChipsInput from "../../components/chip";
import Toast from "../../components/toast";
import { baseURL } from "../../const";
import { useNavigate } from "react-router-dom";
import {
  postGeneratorOptions,
  postGeneratorToolsMap,
} from "../../data/DataJson";

const EmployeeStudio = () => {
  const [activePopup, setActivePopup] = useState(""); // Tracks which popup to show

  const [uploadFileEnabled, setUploadFileEnabled] = useState(false);
  const [readUrlEnabled, setReadUrlEnabled] = useState(false);
  const [environmentOptions, setEnvironmentOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [tools, setTools] = useState([]);
  const [agents, setAgents] = useState([]); // Define agents state

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    system_prompt: "",

    agent_description: "",
    tools: "",
    modelEmployee: "",
  });

  const handleManagePopup = (popupType) => {
    setActivePopup(popupType); // Set the active popup based on the clicked ChipsInput
  };

  const handleCancel = () => {
    setActivePopup(""); // Close the popup
  };

  useEffect(() => {
    const prompt = [
      "Enter prompt",
      readUrlEnabled ? "or give URL details" : "",
      uploadFileEnabled ? "or attach a file" : "",
    ]
      .join(" ")
      .trim();
    setFormData((prevFormData) => ({ ...prevFormData, system_prompt: prompt }));
  }, [uploadFileEnabled, readUrlEnabled]);

  const handleChange = (key, value) => {

    
    setFormData({ ...formData, [key]: value });

  };

  // Callback function to save the tools selected in the modal
 

    useEffect(() => {
      const storedTools = JSON.parse(localStorage.getItem("enabledAgents")) || [];
 setTools(storedTools);
      console.log(storedTools);
    }, []);

  useEffect(() => {
    const fetchEnvironmentOptions = async () => {
      try {
        const response = await fetch(`${baseURL}/environments`);
        if (!response.ok)
          throw new Error("Failed to fetch environment options");
        const data = await response.json();
        setEnvironmentOptions(
          data.map((env) => ({ value: env.id, label: env.name }))
        );
      } catch (error) {
        // showToast(error.message, 'error');
        console.error("Error fetching environment options:", error);
      }
    };
    fetchEnvironmentOptions();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  // Modify the handleSubmit function
  const handleSubmit = async (e) => {
    console.log("checking the form data", formData);
    console.log("tools cheking", tools)
    console.log("Agnets cheking", agents);

    
    e.preventDefault();

    setLoading(true);

    // Extract tool IDs and agent IDs
    const filteredToolIds = Array.from(
      new Set(
        tools.map((tool) => tool.id) // Assuming 'tool.id' is the ID for each tool
      )
    );

    const filteredAgentIds = Array.from(
      new Set(
        agents.map((agent) => agent.id) // Assuming 'agent.id' is the ID for each agent
      )
    );

    let systemPrompt = formData.system_prompt;
    if (uploadFileEnabled && file) {
      systemPrompt += `File: ${file.name}`;
    }
    if (readUrlEnabled && url) {
      systemPrompt += ` URL: ${url}`;
    }

    const requestBody = {
      ...formData,
      system_prompt: formData.postGeneratorType,
      tools: filteredToolIds.join(", "), // Pass the tools as a comma-separated string
      agents: filteredAgentIds.join(", "), // Pass the agents as a comma-separated string
      env_id: formData.modelEmployee,
      upload_attachment: uploadFileEnabled,
    };

    try {
      const response = await fetch(`${baseURL}/agent/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to create employee");
      showToast("Employee created successfully", "success");
      setFormData({
        name: "",
        agent_description: "",
        modelEmployee: "",
        system_prompt: "",
        
      });
      setUploadFileEnabled(false);
      setReadUrlEnabled(false);
      setFile(null);
      setUrl("");
      navigate("/market-place");
    } catch (error) {
      showToast("Failed to create employee: " + error.message, "error");
      console.error("Error creating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (type, key, label, placeholder = "", options = []) => {
    switch (type) {
      case "text":
        return (
          <TextInput
            label={label}
            placeholder={placeholder}
            value={formData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        );
      case "textarea":
        return (
          <TextAreaInput
            label={label}
            placeholder={placeholder}
            value={formData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        );
      case "select":
        return (
          <SelectInput
            label={label}
            options={options}
            value={formData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        );
      case "switch":
        return (
          <SwitchInput
            label={label}
            checked={
              key === "uploadFileEnabled" ? uploadFileEnabled : readUrlEnabled
            }
            onChange={() =>
              key === "uploadFileEnabled"
                ? setUploadFileEnabled(!uploadFileEnabled)
                : setReadUrlEnabled(!readUrlEnabled)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-100 font-sans font-custom justify-center">
      <div className="w-full md:w-1/2 p-6">
        <div className="border-2 bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Config</h2>
            {renderInput(
              "text",
              "name",
              "Employee Name",
              "Enter Employee Name"
            )}
            {renderInput(
              "textarea",
              "agent_description",
              "Employee Description",
              "Enter Employee Description"
            )}
            {renderInput(
              "select",
              "modelEmployee",
              "Model Employee Planner",
              "",
              environmentOptions
            )}

            <ChipsInput
              label="Agents"
              chip={tools}
              chips={tools}
              setChips={setTools}
              activePopup={activePopup}
              formData={formData}
              setActivePopup={handleManagePopup} // Pass directly
              isModalOpen={activePopup === "Agents"}
              setIsModalOpen={handleCancel}
            />
            <ChipsInput
              label="Tools"
              chip={tools}
              activePopup={activePopup}
              PopupTitle="Manage Tools"
              buttonTitle="Manage Tools"
              chips={tools}
              setChips={setTools}
              formData={formData}
              setActivePopup={handleManagePopup} // Pass directly
              isModalOpen={activePopup === "Tools"}
              setIsModalOpen={handleCancel}
            />

            <button
              type="submit"
              className={`mt-6 w-full py-2 px-4 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {toast.visible && (
        <Toast
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
          type={toast.type}
        />
      )}
    </div>
  );
};

export default EmployeeStudio;
