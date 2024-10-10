import React, { useRef } from 'react';

const TextAreaInput = ({ label, placeholder, value, onChange }) => {
    const textAreaRef = useRef(null);

    // Function to auto-adjust the height of the textarea
    const handleInput = (e) => {
        const textarea = textAreaRef.current;
        textarea.style.height = 'auto';  // Reset the height
        textarea.style.height = `${textarea.scrollHeight}px`;  // Set it to the scroll height
        onChange(e);  // Call the passed onChange handler
    };

    return (
        <div className="mb-2">
            <label className="block text-gray-700 font-semibold">{label}</label>
            <textarea
                ref={textAreaRef}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder={placeholder}
                value={value}
                onChange={handleInput}
                rows="2"  // Initial rows count
                style={{ resize: 'none', overflow: 'hidden' }}  // Disable resize and hide scrollbar
            />
        </div>
    );
};

export default TextAreaInput;
