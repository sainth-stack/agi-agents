import React, { useState, useEffect } from 'react';

const ChipsInput = ({ chip = {}, label }) => {
    const [chips, setChips] = useState([]);

    // Extract keys with `true` values when component mounts or `chipsObject` changes
    useEffect(() => {
        const extractedChips = Object.keys(chip).filter(key => chip[key]);
        console.log(extractedChips)
        setChips(extractedChips);
    }, [chip]);

    const handleDeleteChip = (chipToDelete) => {
        const updatedChips = chips.filter((chip) => chip !== chipToDelete);
        setChips(updatedChips); // Update state with remaining chips
    };

    return (
        <div className="flex flex-col mb-4">
            <label className="font-bold mb-2">{label}</label>
            <div className="flex flex-wrap border border-gray-300 rounded-md p-2">
                {chips.map((chip, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-blue-500 text-white rounded-full px-2 py-1 m-1"
                    >
                        {chip}
                        <button
                            onClick={() => handleDeleteChip(chip)}
                            className="ml-2 text-white focus:outline-none"
                        >
                            ✖
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChipsInput;
