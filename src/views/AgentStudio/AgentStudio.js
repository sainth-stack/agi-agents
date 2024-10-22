import React, { useState, useEffect } from 'react';
import TextInput from '../../components/Inputs/TextInput';
import TextAreaInput from '../../components/TextArea/TextAreaInput';
import SelectInput from '../../components/Select/SelectInput';
import SwitchInput from '../../components/switch';
import ChipsInput from '../../components/chip';
import Toast from '../../components/toast';
import { baseURL } from '../../const';

const AgentStudio = () => {
    const [uploadExcel, setUploadExcel] = useState(false);
    const [readWebsite, setReadWebsite] = useState(false);
    const [environmentOptions, setEnvironmentOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [tools, setTools] = useState([]);
    const [uploadFileEnabled, setUploadFileEnabled] = useState(false);
    const [readUrlEnabled, setReadUrlEnabled] = useState(false);
    const [file, setFile] = useState(null); // State for file upload
    const [url, setUrl] = useState(''); // State for URL input
    const [formData, setFormData] = useState({
        name: '',
        agent_description: '',
        modelAgent: '',
        system_prompt: ''
    });

    // Update the system_prompt dynamically based on switches
    useEffect(() => {
        let prompt = 'Enter prompt';
        if (readUrlEnabled) {
            prompt += ' or give URL details';
        }
        if (uploadFileEnabled) {
            prompt += ' or attach a file';
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            system_prompt: prompt
        }));
    }, [uploadFileEnabled, readUrlEnabled]);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    useEffect(() => {
        const storedTools = JSON.parse(localStorage.getItem('enabledTools')) || [];
        setTools(storedTools);
    }, []);

    useEffect(() => {
        const fetchEnvironmentOptions = async () => {
            try {
                const response = await fetch(`${baseURL}/environments`);
                if (!response.ok) throw new Error('Failed to fetch environment options');
                const data = await response.json();
                setEnvironmentOptions(data.map((env) => ({ value: env.id, label: env.name })));
            } catch (error) {
                showToast(error.message, 'error');
                console.error('Error fetching environment options:', error);
            }
        };
        fetchEnvironmentOptions();
    }, []);

    const showToast = (message, type) => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast({ ...toast, visible: false }), 3000);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!formData.name || !formData.agent_description) {
        //     showToast('Please fill in all required fields', 'error');
        //     return;
        // }

        setLoading(true);
        const toolsData = Object.keys(tools).length > 0
            ? Object?.keys(tools)?.map((item) =>
                item.includes(' ') ? item.split(' ').join('_').toLowerCase() : item.toLowerCase()
            )
            : [];
        // Handle system prompt concatenation based on switches
        let systemPrompt = formData.system_prompt;
        if (uploadFileEnabled && file) {
            systemPrompt += ` File: ${file.name}`;
        }
        if (readUrlEnabled && url) {
            systemPrompt += ` URL: ${url}`;
        }

        const requestBody = {
            ...formData,
            tools: toolsData.join(', '),
            env_id: formData.modelAgent,
            upload_attachment: uploadFileEnabled,
        };

        try {
            const response = await fetch(`${baseURL}/agent/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) throw new Error('Failed to create agent');
            const result = await response.json();
            showToast('Agent created successfully', 'success');
            setFormData({ name: '', agent_description: '', modelAgent: '', system_prompt: '' });
            setUploadExcel(false);
            setReadWebsite(false);
            setFile(null); // Clear file input
            setUrl(''); // Clear URL input
        } catch (error) {
            showToast('Failed to create agent: ' + error.message, 'error');
            console.error('Error creating agent:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (type, key, label, placeholder = '', options = []) => {
        switch (type) {
            case 'text':
                return (
                    <TextInput
                        label={label}
                        placeholder={placeholder}
                        value={formData[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                );
            case 'textarea':
                return (
                    <TextAreaInput
                        label={label}
                        placeholder={placeholder}
                        value={formData[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                );
            case 'select':
                return (
                    <SelectInput
                        label={label}
                        options={options}
                        value={formData[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                );
            case 'switch':
                return (
                    <SwitchInput
                        label={label}
                        checked={key === 'uploadExcel' ? uploadExcel : readWebsite}
                        onChange={() =>
                            key === 'uploadExcel' ? setUploadExcel(!uploadExcel) : setReadWebsite(!readWebsite)
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex bg-gray-100 font-sans font-custom">
            <div className="w-full md:w-1/2 p-6">
                <div className="border-2 bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-700">Configure your Agent</h2>
                        {renderInput('text', 'name', 'Agent Name', 'Enter Agent Name')}
                        {renderInput('textarea', 'agent_description', 'Agent Description', 'Enter Agent Description')}
                        {renderInput('select', 'modelAgent', 'Model Agent Planner', '', environmentOptions)}

                        {/* Switches for Upload File and Read URL */}
                        <div className="mb-3 d-flex gap-3">
                            <SwitchInput
                                label="Upload File"
                                checked={uploadFileEnabled}
                                onChange={() => setUploadFileEnabled(!uploadFileEnabled)}
                            />
                            <SwitchInput
                                label="Read URL"
                                checked={readUrlEnabled}
                                onChange={() => setReadUrlEnabled(!readUrlEnabled)}
                            />
                        </div>

                        {renderInput('textarea', 'system_prompt', 'System Prompt', `Enter prompt ${readUrlEnabled ? "or give URL details" : ''} ${uploadFileEnabled ? "or attach a file" : ''}`)}
                        <ChipsInput label="Tools" chip={tools} />

                        {tools.length == 0 && (
                            <p className="text-sm text-gray-500 mt-2">No tools selected</p>
                        )}

                        <button
                            type="submit"
                            className={`mt-6 w-full py-2 px-4 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 justify-center items-center p-6">
                <div className="border-2 bg-white rounded-lg shadow-lg p-6 w-full">
                    <h3 className="text-lg font-bold mb-4 text-gray-600">Form Data JSON</h3>
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                        {JSON.stringify({ ...formData, tools, uploadFileEnabled, readUrlEnabled }, null, 2)}
                    </pre>
                </div>
            </div>

            {toast.visible && (
                <Toast message={toast.message} onClose={() => setToast({ ...toast, visible: false })} type={toast.type} />
            )}
        </div>
    );
};

export default AgentStudio;
