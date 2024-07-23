import React from 'react';
import PropTypes from 'prop-types';

function Question({ question, options, selectedOption, onOptionSelect }) {
    return (
        <div>
            <h2>{question}</h2>
            <ul>
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={selectedOption === index ? 'selected' : ''}
                        onClick={() => onOptionSelect(index)} // Pass index instead of option text
                        role="button"
                        aria-pressed={selectedOption === index}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOption: PropTypes.number,
    onOptionSelect: PropTypes.func.isRequired,
};

export default Question;
