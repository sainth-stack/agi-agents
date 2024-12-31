import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { Tools } from "../../data/DataJson";
import Toast from "../toast";
import { baseURL } from "../../const";
import axios from 'axios'
import { FaChartLine } from "react-icons/fa";
export const ConfigureAgents2 = ({
  selectedTools = [],
  handleToolChange,
  setIsModalOpen,
}) => {
  const [enabledAgents, setEnabledAgents] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgents, setFilteredAgents] = useState(Tools);
  const [data, setData] = useState(Tools)
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [error, setError] = useState("")


  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${baseURL}/dyn_agents/`);
        const findata = response?.data?.agents?.map((item) => {
          return {
            id: item?.id,
            title: item?.agent_name,
            heading: item?.agent_description,
            category: "Custom Agetns",
            icon: <FaChartLine />,
            href: "/graph-to-sql",
            customagent: true
          }
        })
        setData([...data, ...findata,]);
      } catch (error) {
      } finally {
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
    // If another agent is already selected, show alert and prevent the selection
    if (selectedAgent && selectedAgent.id !== agent.id) {
      setError("You can select at most 1 agent.");

      return;
    }

    // If the agent is already selected, deselect it (uncheck the box)
    if (selectedAgent && selectedAgent.id === agent.id) {
      setSelectedAgent(null);
      setError("")  // Deselect the agent
    } else {
      setSelectedAgent(agent); // Set the selected agent
    }

    handleToolChange(agent.title); // Call the handler for enabling/disabling
  };

  const resetConfiguration = () => {
    setEnabledAgents([]);
    setSelectedAgent(null); // Reset selected agent
    localStorage.removeItem("enabledAgents");
  };

  const saveAllConfigurations = () => {
    setIsModalOpen(false);
    localStorage.setItem("enabledAgents", JSON.stringify(enabledAgents));
    // setEnabledAgents(storedAgents);
  };

  const categories = [
    ...new Set(data?.map((agent) => agent.category)),
  ];

  return (
    <>
      <div className=" w-full flex flex-col items-start bg-white p-4">
        <div className="w-full max-w-md mb-6 shadow-md rounded-md p-2">
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border text-lg rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="">
          {error && error ? (
            <>
              <div class="max-w-md mx-auto mt-2 bg-red-100 border-l-4 border-red-500 text-red-700  rounded-lg p-2 shadow-lg">
                <div class="flex items-center justify-center">
                  <svg
                    class="w-6 h-6 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m9 3H3a2 2 0 01-2-2V4a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p class="font-bold flex items-center mt-2">{error}.</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {categories.map((category) => (
            <div key={category} className="category-section mt-5">
              <h2 className="category-title font-bold text-lg mb-2">
                {category}
              </h2>

              <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {data?.filter((agent) => agent.category === category)
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
                          isChecked={selectedAgent?.id === agent.id} // Check if this agent is selected
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
            Done
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
