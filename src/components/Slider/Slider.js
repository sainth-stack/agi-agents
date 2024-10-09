import React from 'react';

//import './Slider.css';
const SliderInput = ({ label, value, onChange, min = 0, max = 1, step = 0.1 }) => {
    return (
        <div className="mb-2 ">
            <label className="block text-gray-700 font-semibold">{label}: {value}</label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className="w-full bg-black text-red-500 slider"
            />
        </div>
    );
};

export default SliderInput;
