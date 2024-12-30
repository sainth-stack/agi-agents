import React, { useState, useEffect } from 'react';
import { Tools } from '../../data/DataJson';
import ConfigureAgents2 from './agentPopup';
import CreateAgentPopup from './AgentCreatePopup';
import { useLocation } from 'react-router-dom';

const ChipsInput = ({
  chip = [],
  buttonTitle,label,
    chips,
  PopupTitle,
  setChips,
  formData,
  isModalOpen,
  setIsModalOpen,
}) => {

  console.log("cips cheking",chips)
  const [selectedTools, setSelectedTools] = useState([]);
  const [defaultSelection, setDefaultSelection] = useState(null);

  useEffect(() => {
    setChips(chip);
    const initialSelectedTools = chip.map((c) => c.name);
    setSelectedTools(initialSelectedTools);

    const initialDefault = chip.find((c) => c.isDefault);
    if (initialDefault) {
      setDefaultSelection(initialDefault.name);
    }
  }, [chip]);
    
    

  const handleManageTools = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleToolChange = (toolName) => {
    if (defaultSelection) return;

    const updatedSelection = selectedTools.includes(toolName)
      ? selectedTools.filter((tool) => tool !== toolName)
      : [...selectedTools, toolName];

    setSelectedTools(updatedSelection);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const location = useLocation();

  return (
    <div className="flex flex-col mb-4 px-2">
      <div className="flex justify-between items-center mb-2">
        <label className="font-bold mb-2">{label}</label>
        <button
          type="button"
          onClick={handleManageTools}
          className="ml-2 py-1 px-3 text-indigo-600 font-semibold bg-transparent border border-indigo-600 rounded hover:bg-indigo-50"
        >
          {(buttonTitle && buttonTitle) || "Manage Agents"}
        </button>
      </div>

      <div className="flex flex-wrap border border-gray-300 rounded-md p-2">
        {chips.map((chip) => (
          <div
            key={chip.name}
            className="flex items-center bg-blue-500 text-white rounded-full px-2 py-1 m-1"
          >
            {chip.name}
            <button
              onClick={() => setIsModalOpen(false)}
              className="ml-2 text-white focus:outline-none"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-90 shadow-lg relative">
            <button
              onClick={handleCancel}
              className="absolute top-3 right-10 text-gray-500 hover:text-gray-600"
            >
              ✖
            </button>
            <h1 className="text-[25px] font-semibold mb-4 text-gray-700">
              {(PopupTitle && PopupTitle) || "Manage Agents"}
            </h1>

            <div className="flex flex-col h-[500px] overflow-y-auto pr-2">
              {location.pathname === "/agent-create" ? (
                <CreateAgentPopup
                  selectedTools={selectedTools} // Pass selected tools as prop
                  handleToolChange={handleToolChange} // Pass tool change handler
                  setIsModalOpen={setIsModalOpen}
                />
              ) : location.pathname === "/create-agent" ? (
                <ConfigureAgents2
                  selectedTools={selectedTools} // Pass selected tools as prop
                  handleToolChange={handleToolChange} // Pass tool change handler
                  setIsModalOpen={setIsModalOpen}
                />
              ) : (
                <div>No component available for this path.</div>
              )}
            </div>
            {/* <button onClick={handleSave} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                            Save Tools
                        </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChipsInput;
