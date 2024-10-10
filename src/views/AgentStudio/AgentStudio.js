import React, { useState } from 'react';
import { FaMagic } from 'react-icons/fa';
import TextInput from '../../components/Inputs/TextInput';
import TextAreaInput from '../../components/TextArea/TextAreaInput';
import SelectInput from '../../components/Select/SelectInput';
import { environmentOptions } from '../../data/DataJson';

const AgentStudio = () => {
    const [formData, setFormData] = useState({
        name: '',
        environment: '',
        systemPrompt: '',
        agentDescription: ''
    });

    // Handler to manage form input changes
    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    // Function to render different types of inputs
    const renderInput = (type, key, label, placeholder = '', options = []) => {
        if (type === 'text') {
            return (
                <TextInput
                    label={label}
                    placeholder={placeholder}
                    value={formData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            );
        } else if (type === 'textarea') {
            return (
                <TextAreaInput
                    label={label}
                    placeholder={placeholder}
                    value={formData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            );
        } else if (type === 'select') {
            return (
                <SelectInput
                    label={label}
                    options={options}
                    value={formData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            );
        }
        return null;
    };

    return (
        <div className="flex bg-white  justify-center items-center  ">
            <div className="w-full p-1">
                <div className="border-2 w-full bg-slate-50 shadow-md  rounded-lg px-3">
                    <h6 className="text-3xl font-bold my-2">Agentic AI studio</h6>
                    <form>
                        <h2 className="text-xl font-bold ">Configure your Agent:</h2>

                        {renderInput('text', 'name', 'Name', 'Enter Agent Name')}

                        {renderInput('select', 'environment', 'Environment', '', environmentOptions)}

                        {renderInput('textarea', 'systemPrompt', 'System Prompt', 'Enter System Prompt')}

                        <div className="mb-1 flex items-center">
                            <button
                                type="button"
                                className="bg-black text-white p-1 rounded-md flex items-center hover:bg-slate-300 hover:text-black hover:font-semibold mb-2 "
                            >
                                <FaMagic className="mr-2 animate-pulse  transition-all" />
                                Import Prompt
                            </button>
                        </div>

                        {/* Render Agent Description TextArea */}
                        {renderInput('textarea', 'agentDescription', 'Agent Description', 'Enter Agent Description')}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AgentStudio;
