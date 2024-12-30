import React, { useState } from 'react'
import TextInput from '../../components/Inputs/TextInput';
import TextAreaInput from '../../components/TextArea/TextAreaInput';
import SelectInput from '../../components/Select/SelectInput';
import SwitchInput from '../../components/switch';
import ChipsInput from '../../components/chip';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../const';
import Toast from '../../components/toast';
import { AgentTools, postGeneratorToolsMap, ToolMapping } from '../../data/DataJson';

const CreateAgent = () => {

    /* states */

 
   const [uploadFileEnabled, setUploadFileEnabled] = useState(false);
   const [readUrlEnabled, setReadUrlEnabled] = useState(false);
   const [loading, setLoading] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [toast, setToast] = useState({
     message: "",
     type: "",
     visible: false,
   });
   const [tools, setTools] = useState([]);
   const [file, setFile] = useState(null);
   const [url, setUrl] = useState("");
   const navigate = useNavigate();
     const [formData, setFormData] = useState({
         agent_name: "",
         "agent_goal": "",
         agent_description: "",
         "agent_instructions": "",
         "tools":""
     });
    
    /* handler functions */
    const handleChange = (key, value) => {
        console.log("key ",key,"value",value)
      setFormData({ ...formData, [key]: value });


         if (key === "postGeneratorType") {
           const selectedTools = ToolMapping[value] || [];
           setTools(selectedTools);

           // Open agents modal when Agent Name is selected
           if (value) {
             setIsModalOpen(true);
           }
         }
       
    };

    /* input render */
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


      const showToast = (message, type) => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast({ ...toast, visible: false }), 3000);
    };
    

     const handleSubmit = async (e) => {
       e.preventDefault();

       setLoading(true);
       const filteredTools = Array.from(
         new Set(
           tools.map((tool) => {
             return tool.id; // Return the original tool ID
           })
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
         tools: filteredTools.join(", "),
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
           agent_name: "",
           agent_goal: "",
           agent_description: "",
           agent_instructions: "",
           tools: "",
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
    
    
  return (
    <div className="flex bg-gray-100 font-sans font-custom justify-center">
      <div className="w-full md:w-1/2 p-6">
        <div className="border-2 bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              Configure your Agent
            </h2>
            {renderInput("text", "agent_name", "Agent Name", "Enter Agent Name")}
            {renderInput("text", "agent_goal", "Agent Goal", "Enter Agent Goal")}

            {renderInput(
              "textarea",
               "agent_description",
              "Agent Description",
              "Enter Agent Description"
            )}
            {renderInput(
              "textarea",
              "agent_instructions",
              "Agent Instructions",
              "Enter Agent Instructions"
            )}

            <ChipsInput
              label="Tools"
                          chip={tools}
                          PopupTitle="Manage Tools"
                          buttonTitle={"Manage Tools"}
              chips={tools}
              setChips={setTools}
              formData={formData}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
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

      {/* <div className="hidden md:flex w-1/2 justify-center items-center p-6">
        <div className="border-2 bg-white rounded-lg shadow-lg p-6 w-full">
          <h3 className="text-lg font-bold mb-4 text-gray-600">
            Form Data JSON
          </h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(
              { ...formData, tools, uploadFileEnabled, readUrlEnabled },
              null,
              2
            )}
          </pre>
        </div>
      </div> */}

      {toast.visible && (
        <Toast
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
          type={toast.type}
        />
      )}
    </div>
  );
}

export default CreateAgent