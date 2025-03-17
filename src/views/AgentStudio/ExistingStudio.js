import React, { useState, useEffect } from "react";
import TextInput from "../../components/Inputs/TextInput";
import TextAreaInput from "../../components/TextArea/TextAreaInput";
import Toast from "../../components/toast";
import { baseURL } from "../../const";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import imag from "../../assets/images/layout/image.png";
const ExistingAgents = () => {
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    agent_description: "",
  });
  console.log(selectedTemplate)
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const email = localStorage.getItem("email");
        const formData = new FormData();
        formData.append("email", email);
        const response = await axios.post(`${baseURL}/agents_by_mail`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setAgents(response.data.agents);
      } catch (error) {
        setAgents([]);
        showToast("Failed to fetch templates", "error");
      }
    };
    fetchAgents();
  }, []);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const agent = agents.find((item) => parseInt(item.id) === parseInt(selectedTemplate.id));
    try {
      const requestBody = {
        ...agent,
        ...formData,
        email: localStorage.getItem("email"),
      };
      const response = await axios.post(`${baseURL}/agent/create`, requestBody, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        showToast("Agent cloned successfully", "success");
        setFormData({ name: "", agent_description: "" });
        setSelectedTemplate(null);
        navigate("/market-place");
      }
    } catch (error) {
      showToast("Failed to clone agent", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChange=(agent)=>{
    setSelectedTemplate(agent);
    setIsModalOpen(false);
  }
console.log(agents,'agge')
  return (
    <div className="flex bg-gray-100 font-sans font-custom justify-center">
      <div className="w-full md:w-1/2 p-6">
        <div className="border-2 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Clone Existing AI Digital Worker</h2>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <TextAreaInput
              label="Description"
              placeholder="Enter Description"
              value={formData.agent_description}
              onChange={(e) => handleChange("agent_description", e.target.value)}
            />
            <label className="font-bold mb-2 block flex items-center justify-between">
              Select Template
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded-lg transition-all"
              >
                Choose
              </button>
            </label>
            <div className="flex flex-wrap border border-gray-300 rounded-md p-2">
              {selectedTemplate ? (
                <div
                  className="cursor-pointer flex items-center bg-blue-500 text-white rounded-full px-3 py-1 m-1 transition-all"
                >
                  {selectedTemplate?.name}
                </div>
              ) : (
                <span className="text-gray-600">No template selected</span>
              )}
            </div>
            <button
              type="submit"
              className={`mt-6 w-full py-2 px-4 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Clone Agent"}
            </button>
          </form>
        </div>
      </div>
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, visible: false })} />}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" >
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2" style={{height:"calc(100vh - 300px)",overflow:'auto'}}>
            <h2 className="text-xl font-bold mb-4">Select an Template</h2>
            <div className="flex flex-wrap gap-4">
              {agents.map((agent) => (
                // <div
                //   key={agent.id}
                //   className="cursor-pointer p-3 bg-gray-200 rounded-lg hover:bg-gray-300"
                //   onClick={() => {
                //     setSelectedTemplate(agent);
                //     setIsModalOpen(false);
                //   }}
                // >
                //   {agent.name}
                // </div>
                <Card
                key={agent.id}
                title={agent.name}
                heading={
                  <span className="font-semibold">{agent.agent_description}</span>
                }
                icon={<img src={imag} alt="Icon" className="w-8 h-8" />
              }
                toggle={
                  <Toggle
                    isChecked={selectedTemplate?.id === agent.id} // Check if agent is selected
                    onToggleChange={() => handleToggleChange(agent)}
                  />
                }
                minWidth="200px"
                className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] flex flex-col justify-between"
              />
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Toggle = ({ isChecked, onToggleChange }) => (
  <label
    className="relative inline-flex items-center cursor-pointer w-12 h-6"
    style={{
      opacity: isChecked ? 1 : 0.8,
      cursor: "pointer",
    }}
  >
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onToggleChange}
      className="sr-only peer"
    />
    <div className="w-full h-full bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-all duration-300"></div>
    <div className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 transform peer-checked:translate-x-6"></div>
  </label>
);

export default ExistingAgents;


