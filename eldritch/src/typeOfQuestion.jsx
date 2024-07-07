import React, { useState } from 'react';

    const DropDown = ({ label ,options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        onChange(event.target.value); // Pass selected value to parent component
    };

    return (
        <div>
        <label>{label}</label>
        <select value={selectedOption} onChange={handleSelectChange}>
            <option value="">Select an option</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        </div>
    );
};

export default DropDown;
