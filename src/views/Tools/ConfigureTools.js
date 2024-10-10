// ConfigureTools.js
import React, { useState } from 'react';
import "./Toggle.css";
import { cardData } from '../../data/DataJson';
import Card from '../../components/Card/Card';
import ModelSelector from './../../components/Model/ModelSelector';

const ConfigureTools = () => {
    const [modelVendor, setModelVendor] = useState('openai');
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('');
    const [temperature, setTemperature] = useState(0.5);
    const [topP, setTopP] = useState(0.9);
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleConfigureClick = (title) => {
        setSelectedCard(title);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCard(null);
    };

    const saveConfiguration = () => {
        console.log(`Saved configuration for ${selectedCard}`);
        closeModal();
    };

    return (
        <>
            <div className="flex justify-center  w-full mt-4 ">
                <div className='border-2 w-[90%] bg-slate-50 rounded-lg'>
                    <h3 className='p-2 m-2  font-bold'>Enable Tools to interact with third-party services:</h3>
                    <div className="grid grid-cols-3 overflow-y-scroll   gap-4 p-4 bg-white">
                        {cardData.map((card, index) => (
                            <Card
                                key={index}
                                title={card.title}
                                href={card.href}
                                heading={
                                    <span className='font-semibold w-40 flex flex-wrap mt-2'>

                                        {card.heading}</span>}
                                icon={card.icon}
                                toggle={<Toggle />}
                                configureButton={
                                    <button
                                        onClick={() => handleConfigureClick(card.title)}
                                        className="mt-4 text-black border-2 rounded-lg py-2 px-4"
                                    >
                                        Configure
                                    </button>
                                }
                            />

                        ))}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed  inset-0 flex w-full items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white  w-[40%] p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Configure {selectedCard}</h2>

                        <ModelSelector
                            model={model}
                            setModel={setModel}
                            temperature={temperature}
                            setTemperature={setTemperature}
                            topP={topP}
                            setTopP={setTopP}
                        />
                        <div className="flex justify-between mt-4">
                            <button onClick={closeModal} className="bg-gray-300 py-2 px-4 rounded">
                                Close
                            </button>
                            <button onClick={saveConfiguration} className="bg-black text-white py-2 px-4 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const Toggle = () => {
    return (
        <label className="inline-flex items-center">
            <input type="checkbox" className="hidden" />
            <div className="toggle-bg w-12 h-6  rounded-full relative cursor-pointer">
                <div className="toggle-dot w-6 h-6  bg-white rounded-full shadow-md absolute top-0 transition-transform duration-300 transform translate-x-0"></div>
            </div>
            <span className="ml-2">Enable</span>
        </label>
    );
};

export default ConfigureTools;
