import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { Tools } from '../../data/DataJson';
import Toast from '../../components/toast';

export const ConfigureAgents = () => {
    const [enabledAgents, setEnabledAgents] = useState([]);
    const [toast, setToast] = useState({ message: '', type: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAgents, setFilteredAgents] = useState(Tools);

    useEffect(() => {
        const storedAgents = JSON.parse(localStorage.getItem('enabledAgents')) || [];
        setEnabledAgents(storedAgents);
    }, []);

    useEffect(() => {
        const results = Tools.filter(agent =>
            agent.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAgents(results);
    }, [searchQuery]);

    const handleToggleChange = (agent) => {
        let updatedAgents;
        if (enabledAgents.some(enabledAgent => enabledAgent.id === agent.id)) {
            updatedAgents = enabledAgents.filter(enabledAgent => enabledAgent.id !== agent.id);
        } else {
            updatedAgents = [...enabledAgents, { id: agent.id, name: agent.title }];
        }

        setEnabledAgents(updatedAgents);
        localStorage.setItem('enabledAgents', JSON.stringify(updatedAgents));
    };

    const resetConfiguration = () => {
        setEnabledAgents([]);
        localStorage.removeItem('enabledAgents');
        setToast({ message: 'All agents have been reset', type: 'error' });
    };

    const saveAllConfigurations = () => {
        localStorage.setItem('enabledAgents', JSON.stringify(enabledAgents));
        setToast({ message: 'All configurations saved', type: 'success' });
    };

    return (
        <>
            <div className="min-h-screen w-full flex flex-col items-start bg-white p-4">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Manage Agents
                </h3>

                {/* Search Bar */}
                <div className="w-full max-w-md mb-6">
                    <input
                        type="text"
                        placeholder="Search agents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Card Container with Controlled Height */}
                <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-y-auto max-h-full">
                    {filteredAgents.map((agent, index) => (
                        <Card
                            key={index}
                            title={agent.title}
                            heading={<span className="font-semibold">{agent.heading}</span>}
                            icon={agent.icon}
                            toggle={
                                <Toggle
                                    isChecked={enabledAgents.some(a => a.id === agent.id)}
                                    onToggleChange={() => handleToggleChange(agent)}
                                />
                            }
                            className="w-full h-full flex flex-col justify-between" // Set card size to full width and height
                        />
                    ))}
                </div>

                <div className="flex space-x-4 mt-8 w-full justify-end">
                    <button
                        onClick={resetConfiguration}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-all"
                    >
                        Reset
                    </button>
                    <button
                        onClick={saveAllConfigurations}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all"
                    >
                        Save
                    </button>
                </div>
            </div>

            {toast.message && (
                <Toast
                    message={toast.message}
                    onClose={() => setToast({ message: '', type: '' })}
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

export default ConfigureAgents;
