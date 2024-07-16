import React from 'react';

function Question({ question, options, selectedOption, onOptionSelect }) {
    return (
        <div>
            <h2>{question}</h2>
            <ul>
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={selectedOption === option ? 'selected' : ''}
                        onClick={() => onOptionSelect(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Question;
