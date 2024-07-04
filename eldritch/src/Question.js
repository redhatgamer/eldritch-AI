import React from 'react';

function Question({ question, options, selectedOption, onOptionSelect }) {
    return (
        <div>
            <h2>{question}</h2>
            {options.map((option) => (
                <div key={option}>
                    <input
                        type="radio"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => onOptionSelect(option)}
                    />
                    {option}
                </div>
            ))}
        </div>
    );
}

export default Question;
