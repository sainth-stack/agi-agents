import React, { useState, useEffect } from 'react';
import { Tools } from '../../data/DataJson';

const ChipsInput = ({ chip = [], label, chips, setChips, formData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTools, setSelectedTools] = useState(new Set());
    const [defaultSelection, setDefaultSelection] = useState(null); // State to track default selection

    useEffect(() => {
        setChips(chip);
        const initialSelectedTools = new Set(chip.map(c => c.name)); // Initialize selected tools based on chips prop using name
        setSelectedTools(initialSelectedTools);

        // Set default selection based on chips
        const initialDefault = chip.find(c => c.isDefault); // Assuming each chip has an `isDefault` property
        if (initialDefault) {
            setDefaultSelection(initialDefault.name); // Use name for default selection
        }
    }, [chip]);

    const handleDeleteChip = (chipToDelete) => {
        const updatedChips = chips.filter(c => c.name !== chipToDelete.name); // Filter by name
        setChips(updatedChips);
        
        // Update selected tools
        const updatedSelected = new Set(selectedTools);
        updatedSelected.delete(chipToDelete.name); // Remove by name
        setSelectedTools(updatedSelected);
        
        // Reset default selection if deleted chip was the default
        if (defaultSelection === chipToDelete.name) {
            setDefaultSelection(null);
        }
    };

    const handleManageTools = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Disable scrolling on modal open
    };

    const handleToolChange = (toolName) => {
        if (defaultSelection) return; // Prevent changing if there's a default selection

        const updatedSelection = new Set(selectedTools);
        updatedSelection.has(toolName) ? updatedSelection.delete(toolName) : updatedSelection.add(toolName);
        setSelectedTools(updatedSelection);
    };

    const handleSave = () => {
        const selectedChips = Array.from(selectedTools).map(name => {
            const tool = Tools.find(tool => tool.title === name); // Find tool by title
            return tool ? { name: tool.title, id: tool.id } : null; // Return name and id
        }).filter(Boolean); // Removes any null values
        
        setChips(selectedChips); // Save as array of objects
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    // Check if all selections should be disabled
    const isSelectionDisabled = formData.postGeneratorType && formData.postGeneratorType !== 'others';

    return (
        <div className="flex flex-col mb-4 px-2">
            <div className="flex justify-between items-center mb-2">
                <label className="font-bold mb-2">{label}</label>
                <button
                    type="button"
                    onClick={handleManageTools}
                    className="ml-2 py-1 px-3 text-indigo-600 font-semibold bg-transparent border border-indigo-600 rounded hover:bg-indigo-50"
                >
                    Manage Tools
                </button>
            </div>

            <div className="flex flex-wrap border border-gray-300 rounded-md p-2">
                {chips.map((chip) => (
                    <div
                        key={chip.name} // Use name as the key
                        className="flex items-center bg-blue-500 text-white rounded-full px-2 py-1 m-1"
                    >
                        {chip.name}
                        <button
                            onClick={() => handleDeleteChip(chip)}
                            className="ml-2 text-white focus:outline-none"
                        >
                            ✖
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for managing tools */}
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-90 shadow-lg relative">
                        <button
                            onClick={handleCancel}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Tools</h2>
                        <div className="flex flex-col max-h-80 overflow-y-auto pr-2">
                            {Tools.map(tool => (
                                <label key={tool.title} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedTools.has(tool.title)} // Use title for selection
                                        onChange={() => handleToolChange(tool.title)} // Use title for change
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-14"
                                        disabled={isSelectionDisabled || (defaultSelection && defaultSelection !== tool.title)} // Disable if not 'others' or if there's a default selection
                                    />
                                    <span className="text-gray-700 w-[400px]">{tool.title}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleCancel}
                                className="mr-2 px-4 py-1 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChipsInput;
