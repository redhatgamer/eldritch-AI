import React from 'react';
import './App.css';

function Question({ question, options, selectedOption, onOptionSelect }) {
    return (
        <div className="question-container">
            <h2>{question}</h2>
            <div className="options-container">
                {options.map((option, index) => (
                    <div 
                        key={index} 
                        className={`option-box ${selectedOption === option ? 'selected' : ''}`}
                        onClick={() => onOptionSelect(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Question;
