import React, { useState, useEffect } from "react";
import CreateAgentPopup from "./AgentCreatePopup";
import { ConfigureAgents2 } from "./agentPopup";

const ChipsInput = ({
  chip = [],
  activePopup,
  setActivePopup,
  buttonTitle,
  label,
  chips,
  PopupTitle,
  setChips,
  formData,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [selectedChips, setSelectedChips] = useState([]);

  useEffect(() => {
    // Initialize chips state
    setChips(chip);
    setSelectedChips(chip.map((c) => c.name)); // Set initial selected chips
  }, [chip, setChips]);

  const handleManageTools = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleToolChange = (toolName) => {
    const updatedChips = selectedChips.includes(toolName)
      ? selectedChips.filter((tool) => tool !== toolName) // Remove chip if already selected
      : [toolName]; // Ensure only one chip is selected
    setSelectedChips(updatedChips);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleToggleChange = (agent) => {
    console.log("selected agent", agent);
    // If the agent is already selected, deselect it
    if (selectedChips.includes(agent.title)) {
      setSelectedChips([]); // Deselect the agent
      handleToolChange(""); // Reset tool selection
    } else {
      setSelectedChips([agent.title]); // Select the new agent
      handleToolChange(agent.title); // Pass the selected agent title
    }
  };

  return (
    <div className="flex flex-col mb-4 px-2">
      <div className="flex justify-between items-center mb-2">
        <label className="font-bold mb-2">{label}</label>
        <button
          type="button"
          onClick={() => setActivePopup(label === "Tools" ? "Tools" : "Agents")}
          className="ml-2 py-1 px-3 text-indigo-600 font-semibold bg-transparent border border-indigo-600 rounded hover:bg-indigo-50"
        >
          {buttonTitle ||
            (label === "Tools" ? "Manage Tools" : "Manage Agents")}
        </button>
      </div>

      {/* Selected chips display */}
      <div className="flex flex-wrap border border-gray-300 rounded-md p-2">
        {selectedChips.length > 0 ? (
          selectedChips.map((chipName, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1 m-1"
            >
              {chipName}
              <button
                onClick={() => handleToolChange(chipName)} // Allow removing chip
                className="ml-2 text-white focus:outline-none"
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <span className="text-red-600 border border-red-600 p-2 rounded">
            No {label.toLowerCase().charAt(0).toUpperCase() + label.slice(1)}{" "}
            selected
          </span>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-90 shadow-lg relative">
            <button
              onClick={handleCancel}
              className="absolute shadow-md w-8 hover:bg-red-800 h-8 rounded-md font-extrabold top-3 right-10 text-gray-700 hover:text-white"
            >
              ✖
            </button>
            <h1 className="text-[25px] font-semibold mb-4 text-gray-700">
              {PopupTitle || "Manage Agents"}
            </h1>

            <div className="flex flex-col h-[500px] overflow-y-auto pr-2">
              {activePopup === "Agents" ? (
                <ConfigureAgents2
                  selectedTools={selectedChips}
                  handleToolChange={handleToolChange}
                  setIsModalOpen={(value) => {
                    setIsModalOpen(value);
                    if (!value) setActivePopup("");
                  }}
                />
              ) : activePopup === "Tools" ? (
                <CreateAgentPopup
                  selectedTools={selectedChips}
                  handleToolChange={handleToolChange}
                  setIsModalOpen={(value) => {
                    setIsModalOpen(value);
                    if (!value) setActivePopup("");
                  }}
                />
              ) : (
                <div className="text-gray-500">No popup is active</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChipsInput;
