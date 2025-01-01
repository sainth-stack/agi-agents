import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Toast from "../toast";
import { AgentTools } from "../../data/DataJson";

export const CreateAgentPopup = ({
  selectedTools = [],
  formData,
  selectedToggle,setSelectedToggle,
  handleToolChange,
  setIsModalOpen,
}) => {
  const [enabledAgents, setEnabledAgents] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgents, setFilteredAgents] = useState(AgentTools);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAgents =
      JSON.parse(localStorage.getItem("enabledAgents")) || [];
    setEnabledAgents(storedAgents);
  }, []);

  useEffect(() => {
    const results = AgentTools.filter((agent) =>
      agent.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAgents(results);
  }, [searchQuery]);

  const handleToggleChange = (agent) => {
    console.log("selected agent",agent)
    if (selectedToggle === agent.id) {
      setSelectedToggle(null);
      handleToolChange(""); 
    } else {
      setSelectedToggle(agent.id);
      handleToolChange(agent.title); 
    }
  };
  console.log("selected toggke", selectedToggle);

  const resetConfiguration = () => {
    setEnabledAgents([]);
    localStorage.removeItem("enabledAgents");
  };

  const saveAllConfigurations = () => {
    setIsModalOpen(false);
    localStorage.setItem("enabledAgents", JSON.stringify(enabledAgents));
  };

  const categories = [
    ...new Set(filteredAgents.map((agent) => agent.category)),
  ];

  return (
    <>
      <div className="w-full items-start bg-white p-4">
        <div className="w-full max-w-md mb-6 shadow-md rounded-md p-2">
          <input
            type="text"
            placeholder="Search Tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border text-lg rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="max-w-md mx-auto mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg p-2 shadow-lg">
            <div className="flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m9 3H3a2 2 0 01-2-2V4a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2z"
                />
              </svg>
              <p className="font-bold flex items-center mt-2">{error}</p>
            </div>
          </div>
        )}

        {categories.map((category) => (
          <div key={category} className="mt-5">
            <h2 className="category-title font-bold text-lg mb-2">
              {category}
            </h2>
            <div className="w-full max-w-6xl flex flex-wrap gap-8">
              {filteredAgents
                .filter((agent) => agent.category === category)
                .map((agent) => (
                  <Card
                    key={agent.id}
                    title={agent.title}
                    heading={
                      <span className="font-semibold">{agent.heading}</span>
                    }
                    icon={agent.icon}
                    toggle={
                      <Toggle
                        isChecked={selectedToggle === agent.id} // Check if agent is selected
                        onToggleChange={() => handleToggleChange(agent)}
                      />
                    }
                    className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] flex flex-col justify-between"
                  />
                ))}
            </div>
          </div>
        ))}

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

export default CreateAgentPopup;
