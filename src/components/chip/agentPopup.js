import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { Tools } from "../../data/DataJson";
import Toast from "../toast";
import { baseURL } from "../../const";
import axios from "axios";
import { FaChartLine } from "react-icons/fa";

export const ConfigureAgents2 = ({
  selectedTools = [],
  handleToolChange,
  setIsModalOpen,
  selectedAgent,
  setSelectedAgent,
}) => {
  const [enabledAgents, setEnabledAgents] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgents, setFilteredAgents] = useState(Tools);
  const [data, setData] = useState(Tools);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${baseURL}/dyn_agents/`);
        const findata = response?.data?.agents?.map((item) => {
          return {
            id: item?.id,
            title: item?.agent_name,
            heading: item?.agent_description,
            category: "Custom Agents",
            icon: <FaChartLine />,
            href: "/graph-to-sql",
            customagent: true, // Flag indicating custom agent
          };
        });
        setData([...data, ...findata]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    const storedAgents =
      JSON.parse(localStorage.getItem("enabledAgents")) || [];
    setEnabledAgents(storedAgents);
  }, []);

  useEffect(() => {
    const results = data?.filter((agent) =>
      agent.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAgents(results);
  }, [searchQuery]);

  const handleToggleChange = (agent) => {
    if (selectedAgent === agent.id) {
      setSelectedAgent(null);
      handleToolChange(""); // Reset tool
    } else {
      setSelectedAgent(agent);
      handleToolChange(agent.title); // Update selected tool
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

  const categories = [...new Set(data.map((agent) => agent.category))];

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
                {data
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
