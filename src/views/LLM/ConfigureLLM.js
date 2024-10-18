import React, { useState } from 'react';
import axios from 'axios';
import SelectInput from './../../components/Select/SelectInput';
import TextInput from '../../components/Inputs/TextInput';
import SliderInput from './../../components/Slider/Slider';
import { modelOptions, modelVendorOptions } from './../../data/DataJson';
import SwitchInput from '../../components/switch';
import { baseURL } from '../../const';
import Toast from '../../components/toast';

const ConfigureLLM = () => {
    const [modelVendor, setModelVendor] = useState('openai');
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('gpt-4o-mini');
    const [temperature, setTemperature] = useState(0.5);
    const [topP, setTopP] = useState(0.9);
    const [environmentName, setEnvironmentName] = useState('');
    const [uploadExcel, setUploadExcel] = useState(false);
    const [readWebsite, setReadWebsite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        const postData = {
            name: environmentName || 'My Environment',
            model_vendor: modelVendor,
            api_key: apiKey || 'your-api-key-here',
            model: model,
            temperature: temperature,
            top_p: topP,
            upload_excel: uploadExcel,
            read_website: readWebsite
        };

        axios.post(`${baseURL}/environment/create`, postData)
            .then((response) => {
                console.log('API Response:', response.data);
                setToast({ message: 'Planner created successfully!', type: 'success' });
            })
            .catch((error) => {
                console.error('Error creating planner:', error);
                setToast({ message: 'Failed to create planner. Please try again.', type: 'error' });
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    };

    const renderInput = (type, label, key, options = []) => {
        if (type === 'select') {
            return (
                <SelectInput
                    label={label}
                    options={options}
                    value={key === 'modelVendor' ? modelVendor : model}
                    onChange={(e) => {
                        if (key === 'modelVendor') setModelVendor(e.target.value);
                        else setModel(e.target.value);
                    }}
                />
            );
        } else if (type === 'text') {
            return (
                <TextInput
                    label={label}
                    placeholder={`Enter ${label}`}
                    value={key === 'apiKey' ? apiKey : environmentName}
                    onChange={(e) => {
                        if (key === 'apiKey') setApiKey(e.target.value);
                        else setEnvironmentName(e.target.value);
                    }}
                    error={key === 'apiKey' && !apiKey ? 'API Key is required' : ''}
                />
            );
        } else if (type === 'slider') {
            return (
                <SliderInput
                    label={label}
                    value={key === 'temperature' ? temperature : topP}
                    onChange={(e) => {
                        if (key === 'temperature') setTemperature(e.target.value);
                        else setTopP(e.target.value);
                    }}
                    min={0}
                    max={1}
                    step={0.1}
                />
            );
        } else if (type === 'switch') {
            return (
                <SwitchInput
                    label={label}
                    checked={key === 'uploadExcel' ? uploadExcel : readWebsite}
                    onChange={() => {
                        if (key === 'uploadExcel') setUploadExcel(!uploadExcel);
                        else setReadWebsite(!readWebsite);
                    }}
                />
            );
        }
        return null;
    };

    return (
        <div className="flex bg-gray-100 ">
            {/* Left form section */}
            <div className="w-full md:w-1/2 p-6">
                <div className="border-2 bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-700">Plan your LLM</h2>
                        {renderInput('text', 'Model Name', 'environmentName')}
                        {renderInput('select', 'Model Vendor', 'modelVendor', modelVendorOptions)}
                        {renderInput('text', 'LLM API Key', 'apiKey')}
                        {renderInput('select', 'Model', 'model', modelOptions)}
                        <div className="mt-4">
                            {renderInput('slider', 'Temperature', 'temperature')}
                        </div>
                        <button 
                            type="submit" 
                            className={`mt-6 w-full py-2 px-4 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={loading}>
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right JSON display section */}
            <div className="hidden md:flex w-1/2 justify-center items-center p-6">
                <div className="border-2 bg-white rounded-lg shadow-lg p-6 w-full">
                    <h3 className="text-lg font-bold mb-4 text-gray-600">Configuration Preview</h3>
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                        {JSON.stringify({
                            name: environmentName || 'My Model',
                            model_vendor: modelVendor,
                            api_key: apiKey || 'your-api-key-here',
                            model: model,
                            temperature: temperature,
                        }, null, 2)}
                    </pre>
                </div>
            </div>

            {/* Toast for messages */}
            {toast.message && (
                <Toast
                    message={toast.message}
                    onClose={() => setToast({ message: '', type: '' })}
                    type={toast.type}
                />
            )}
        </div>
    );
};

export default ConfigureLLM;
