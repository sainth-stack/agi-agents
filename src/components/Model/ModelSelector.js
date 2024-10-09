// components/Model/ModelSelector.js
import React from 'react';
import SelectInput from '../Select/SelectInput';
import SliderInput from '../Slider/Slider';
import TextInput from '../Inputs/TextInput';  // Import the custom TextInput component
import { modelOptions } from '../../data/DataJson';

const ModelSelector = ({ model, setModel, temperature, setTemperature, topP, setTopP }) => {
    return (
        <div className="mb-4 ">
            <SelectInput
                label="Select Model"
                options={modelOptions} // Ensure this is defined
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
            <TextInput
                label="Temperature"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                type="number"
                required
            />
            <TextInput
                label="Top P"
                value={topP}
                onChange={(e) => setTopP(e.target.value)}
                type="number"
                required
            />
        </div>
    );
};

export default ModelSelector;
