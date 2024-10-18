import React, { useState, useEffect } from 'react';
import "./Toggle.css";
import Card from '../../components/Card/Card';
import { Tools } from '../../data/DataJson';
import Toast from '../../components/toast';

export const ConfigureTools = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [enabledTools, setEnabledTools] = useState({});
    const [toast, setToast] = useState({ message: '', type: '' }); // Toast state

    useEffect(() => {
        const storedTools = JSON.parse(localStorage.getItem('enabledTools')) || {};
        setEnabledTools(storedTools);
    }, []);

    const handleToggleChange = (title) => {
        if (title === "LinkedIn Post") {
            setSelectedCard(title);
            setShowModal(true);
        } else {
            const newEnabledTools = { ...enabledTools, [title]: !enabledTools[title] };
            setEnabledTools(newEnabledTools);
            localStorage.setItem('enabledTools', JSON.stringify(newEnabledTools));
            console.log(`${title} is now ${newEnabledTools[title] ? 'enabled' : 'disabled'}`);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCard(null);
        setApiKey('');
    };

    const saveConfiguration = () => {
        console.log(`Saved API Key for ${selectedCard}: ${apiKey}`);
        const apiKeys = JSON.parse(localStorage.getItem('apiKeys')) || {};
        apiKeys[selectedCard] = apiKey;
        localStorage.setItem('apiKeys', JSON.stringify(apiKeys));

        const newEnabledTools = { ...enabledTools, [selectedCard]: true };
        setEnabledTools(newEnabledTools);
        localStorage.setItem('enabledTools', JSON.stringify(newEnabledTools));

        // Set toast message for saving configuration
        setToast({ message: `Saved configuration for ${selectedCard}`, type: 'success' });

        closeModal();
    };

    const resetConfiguration = () => {
        setEnabledTools({});
        localStorage.removeItem('enabledTools');
        console.log('All tools have been reset');
        // Set toast message for resetting configuration
        setToast({ message: 'All tools have been reset', type: 'error' });
    };

    const saveAllConfigurations = () => {
        console.log('All configurations saved');
        localStorage.setItem('enabledTools', JSON.stringify(enabledTools));
        // Set toast message for saving all configurations
        setToast({ message: 'All configurations saved', type: 'success' });
    };

    return (
        <>
            <div className="flex justify-center w-full mt-4">
                <div className='border-2 w-[90%] bg-slate-50 rounded-lg'>
                    <h3 className='p-2 m-2 font-bold'>Enable Tools</h3>
                    <div className="grid grid-cols-3 overflow-y-scroll gap-4 p-4 bg-white">
                        {Tools.map((card, index) => (
                            <Card
                                key={index}
                                title={card.title}
                                heading={<span className='font-semibold w-40 flex flex-wrap mt-2'>{card.heading}</span>}
                                icon={card.icon}
                                toggle={
                                    <Toggle
                                        isChecked={!!enabledTools[card.title]}
                                        onToggleChange={() => handleToggleChange(card.title)}
                                    />
                                }
                            />
                        ))}
                    </div>
                    <div className="flex justify-end m-3">
                        <button
                            onClick={resetConfiguration}
                            className="bg-red-500 text-white py-2 px-4 rounded mr-4"
                            style={{ height: '40px' }}
                        >
                            Reset All
                        </button>
                        <button
                            onClick={saveAllConfigurations}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            style={{ height: '40px' }}
                        >
                            Save All
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex w-full items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white w-[40%] p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Token for {selectedCard}</h2>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 w-full mb-4"
                            placeholder="Enter API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                        <div className="flex justify-between mt-4">
                            <button onClick={closeModal} className="bg-gray-300 py-2 px-4 rounded">Close</button>
                            <button onClick={saveConfiguration} className="bg-black text-white py-2 px-4 rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}

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

const Toggle = ({ isChecked, onToggleChange }) => {
    return (
        <label className="inline-flex items-center">
            <input
                type="checkbox"
                className="hidden"
                checked={isChecked}
                onChange={onToggleChange}
            />
            <div className="toggle-bg w-12 h-6 rounded-full relative cursor-pointer">
                <div className={`toggle-dot w-6 h-6 bg-white rounded-full shadow-md absolute top-0 transition-transform duration-300 transform ${isChecked ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
            <span className="ml-2">Enable</span>
        </label>
    );
};
