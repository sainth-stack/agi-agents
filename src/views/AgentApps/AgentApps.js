import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../const';
import imag from '../../assets/images/layout/image.png';
import axios from 'axios'; // Import Axios
import MarketPlaceCard from '../../components/market-place';

const AgentApps = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]); // Store agents from the API
    const [searchQuery, setSearchQuery] = useState(''); // Track search input
    const [loading, setLoading] = useState(true); // Track loading state

    // Fetch agents from API
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get(`${baseURL}/agents/`); // Use Axios to fetch data
                console.log('Fetched data:', response.data); // Log the fetched data
                setAgents(response.data.agents); // Access agents array from the response
            } catch (error) {
                console.error('Error fetching agents:', error);
                setAgents([]); // Set to empty array in case of an error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchAgents();
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter agents based on search query
    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle card click to navigate
    const handleCardClick = (id) => {
        navigate(`/ai-environment/${id}`); // Navigate to the new path with agent ID
    };

    if (loading) {
        return <p>Loading agents...</p>; // Show loading message
    }

    return (
        <div className="flex flex-col items-center w-full p-4">
            <h1 className="text-3xl font-bold mb-4">Agent Apps</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="mb-6 px-4 py-2 border rounded w-1/2"
            />

            {/* Container for the card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full place-items-center">
                {filteredAgents.map((agent) => (
                    <div
                        key={agent.id} // Use agent ID as key
                        onClick={() => handleCardClick(agent.id)} // Pass agent ID to the handler
                        className="w-full transition cursor-pointer"
                    >
                        <MarketPlaceCard
                            title={agent?.name} // Use agent.name for title
                            description={agent?.agent_description} // Use agent.agent_description for description
                            icon={<img src={imag} alt="Icon" className="w-12 h-12" />}
                            votes={agent.votes || 0} // Adjust this if your API doesn't return votes
                            visibility={!agent?.public ? 'Public' : 'Private'} // Adjust this if your API doesn't return public
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgentApps;
