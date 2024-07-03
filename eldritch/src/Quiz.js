import React, { useState } from 'react';
import Question from './Question';

const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris'
    },
    {
        question: 'Whatttttt is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4'
    }
    // Add more questions as needed
];

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === quizData[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        setSelectedOption('');
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div>
            {showScore ? (
                <div>
                    <h1>Your score: {score}/{quizData.length}</h1>
                </div>
            ) : (
                <div>
                    <Question
                        question={quizData[currentQuestionIndex].question}
                        options={quizData[currentQuestionIndex].options}
                        selectedOption={selectedOption}
                        onOptionSelect={handleOptionSelect}
                    />
                    <button onClick={handleNextQuestion}>Next</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;
