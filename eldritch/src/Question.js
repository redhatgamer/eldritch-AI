import React from 'react';

function Question({ question, options, selectedOption, onOptionSelect }) {
    return (
        <div>
            <h2>{question}</h2>
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={`option-${index}`}
                        name="quiz"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => onOptionSelect(option)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                </div>
            ))}
        </div>
    );
}

export default Question;
