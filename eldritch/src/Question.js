import React from 'react';
import MathJax from 'react-mathjax2';

function Question({ question, options, selectedOption, onOptionSelect }) {
    return (
        <MathJax.Context input='tex'>
            <div>
                <h2><MathJax.Text text={question} /></h2>
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
                        <label htmlFor={`option-${index}`}><MathJax.Text text={option} /></label>
                    </div>
                ))}
            </div>
        </MathJax.Context>
    );
}

export default Question;
