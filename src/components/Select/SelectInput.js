import React from 'react';

const SelectInput = ({ label, options, value, onChange }) => {
    return (
        <div className="mb-4 p-2">
            <label className="block text-gray-700 font-semibold">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded-md p-2 w-full"
            >
                <option value="">{`Select ${label}`}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
