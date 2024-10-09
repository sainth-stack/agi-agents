import React from 'react';

const Input = React.forwardRef(({ placeholder, value, onChange, masked, className, readOnly, label }, ref) => {
    return (
        <div>
            <label className="block text-gray-700 font-semibold ">{label}</label>
            <input
                type={masked ? 'password' : 'text'}
                ref={ref}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border bg-slate-100 border-gray-300 rounded-md p-2 m-2 w-full" // Custom classes
                readOnly={readOnly}
            />
        </div>
    );
});

export default Input;
