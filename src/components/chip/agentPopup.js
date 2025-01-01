import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { Tools } from "../../data/DataJson";
import Toast from "../toast";

export const ConfigureAgents2 = ({ handleToolChange, setIsModalOpen }) => {
  const [enabledAgents, setEnabledAgents] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgents, setFilteredAgents] = useState(Tools);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const storedAgents =
      JSON.parse(localStorage.getItem("enabledAgents")) || [];
    setEnabledAgents(storedAgents);
  }, []);

  useEffect(() => {
    const results = Tools.filter((agent) =>
      agent.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAgents(results);
  }, [searchQuery]);

  const handleToggleChange = (agent) => {
    if (selectedAgent?.id === agent.id) {
      setSelectedAgent(null); 
      handleToolChange(""); // Pass empty string to reset
    } else {
      setSelectedAgent(agent); // Select the agent
      handleToolChange(agent.title); // Update the selected tool
    }
  };

  const resetConfiguration = () => {
    setEnabledAgents([]); // Reset all enabled agents
    setSelectedAgent(null); // Deselect all
    localStorage.removeItem("enabledAgents"); // Clear from local storage
  };

  const saveAllConfigurations = () => {
    setIsModalOpen(false);
    localStorage.setItem("enabledAgents", JSON.stringify(enabledAgents)); // Persist enabled agents to localStorage
  };

  const categories = [
    ...new Set(filteredAgents.map((agent) => agent.category)),
  ];

  return (
    <>
      <div className="w-full flex flex-col items-start bg-white p-4">
        <div className="w-full max-w-md mb-6 shadow-md rounded-md p-2">
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border text-lg rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          {categories.map((category) => (
            <div key={category} className="category-section mt-5">
              <h2 className="category-title font-bold text-lg mb-2">
                {category}
              </h2>

              <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredAgents
                  .filter((agent) => agent.category === category)
                  .map((agent, index) => (
                    <Card
                      key={index}
                      title={agent.title}
                      heading={
                        <span className="font-semibold">{agent.heading}</span>
                      }
                      icon={agent.icon}
                      toggle={
                        <Toggle
                          isChecked={selectedAgent?.id === agent.id}
                          onToggleChange={() => handleToggleChange(agent)}
                        />
                      }
                      className="w-full h-full flex flex-col justify-between"
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mt-8 w-full justify-end">
          <button
            onClick={saveAllConfigurations}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>

      {toast.message && (
        <Toast
          message={toast.message}
          onClose={() => setToast({ message: "", type: "" })}
          type={toast.type}
        />
      )}
    </>
  );
};

const Toggle = ({ isChecked, onToggleChange }) => (
  <label className="relative inline-flex items-center cursor-pointer w-12 h-6">
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

export default ConfigureAgents2;
