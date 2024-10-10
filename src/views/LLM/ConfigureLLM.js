import React, { useState } from 'react';
import SelectInput from './../../components/Select/SelectInput';
import TextInput from '../../components/Inputs/TextInput';
import SliderInput from './../../components/Slider/Slider';
import { modelOptions, modelVendorOptions } from './../../data/DataJson';

const ConfigureLLM = () => {
    const [modelVendor, setModelVendor] = useState('openai');
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('gpt-4o-mini');
    const [temperature, setTemperature] = useState(0.5);
    const [topP, setTopP] = useState(0.9);

    // Function to render different types of inputs
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
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    error={!apiKey ? 'API Key is required' : ''}
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
        }
        return null;
    };

    // Generate the JSON object based on current state
    const generatedJSON = {
        features: [],
        tools: [],
        llm_config: {
            provider: modelVendor,
            model: model,
            config: {
                temperature: temperature,
                top_p: topP,
            },
        },
        env: {
            OPENAI_API_KEY: apiKey || 'Enter API Key',
        },
    };

    return (
        <div className="flex bg-white h-full">
            {/* Left form section */}
            <div className="w-1/2 p-4">
                <div className="border-2 bg-slate-50 rounded-lg p-6">
                    <form className="p-4">
                        <h2 className="text-xl font-bold mb-4">Configure your LLM:</h2>
                        {renderInput('select', 'Model Vendor', 'modelVendor', modelVendorOptions)}
                        {renderInput('text', 'LLM API Key', 'apiKey')}
                        {renderInput('select', 'Model', 'model', modelOptions)}
                        {renderInput('slider', 'Temperature', 'temperature')}
                        {renderInput('slider', 'Top P', 'topP')}
                    </form>
                </div>
            </div>

            {/* Right JSON display section */}
            <div className="w-1/2 p-4">
                <div className="border-2 bg-slate-50 rounded-lg p-6">
                    <pre className="bg-slate-100 p-4 rounded text-sm">
                        {JSON.stringify(generatedJSON, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default ConfigureLLM;
