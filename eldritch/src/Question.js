import React from 'react';
import MathJax from 'react-mathjax2';

function Question({ question, options, selectedOption, onOptionSelect }) {
    return (
        <MathJax.Context input='tex'>
            <div>
                <h2><MathJax.Text text={question} /></h2>
                <ul>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={selectedOption === index ? 'selected' : ''}
                            onClick={() => onOptionSelect(index)}
                        >
                            <MathJax.Text text={option} />
                        </li>
                    ))}
                </ul>
            </div>
        </MathJax.Context>
    );
}

export default Question;
