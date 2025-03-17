import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../const";
import imag from "../../assets/images/layout/image.png";

import axios from "axios";
import MarketPlaceCard from "../../components/market-place";

const AgentApps = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const email=localStorage.getItem('email')
        const formData = new FormData();
        formData.append("email", email);
        const response = await axios.post(`${baseURL}/agents_by_mail`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setAgents(response.data.agents);
      } catch (error) {
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (agent) => {
    navigate(`/ai-environment/${agent.id}`, {
      state: agent.dynamic_agent_id
        ? { dynamicAgentId: agent.dynamic_agent_id }
        : null,
    });
  };

  if (loading) {
    return <p>Loading agents...</p>;
  }

  console.log("all agents", agents);
  return (
    <div className="flex flex-col items-start w-full p-4">
      <div className="flex flex-col items-start mb-4 w-[500px]">
        <h1 className="text-3xl font-bold">AI Employees</h1>
        <input
          type="text"
          placeholder="Search Employee..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full place-items-center">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => handleCardClick(agent)}
            className="w-full transition cursor-pointer"
          >
            <MarketPlaceCard
              title={agent?.name}
              description={agent?.agent_description}
              icon={<img src={imag} alt="Icon" className="w-12 h-12" />}
              votes={agent.votes || 0}
              visibility={!agent?.public ? "Public" : "Private"}
              className="h-60 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentApps;
