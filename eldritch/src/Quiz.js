import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    // Add more questions as needed
];

function Question({ question, options, selectedOption, onOptionSelect }) {
    return (
        <div className="question-container">
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

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const navigate = useNavigate();

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

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="quiz-container">
            {showScore ? (
                <div className="score-container">
                    <h1>Your score: {score}/{quizData.length}</h1>
                    <button onClick={handleBackToHome}>Back to Home</button>
                </div>
            ) : (
                <div className="question-wrapper">
                    <Question
                        question={quizData[currentQuestionIndex].question}
                        options={quizData[currentQuestionIndex].options}
                        selectedOption={selectedOption}
                        onOptionSelect={handleOptionSelect}
                    />
                    <button onClick={handleNextQuestion}>Next</button>
                </div>
            )}
            {!showScore && <button onClick={handleBackToHome} className="back-btn">Back to Home</button>}
        </div>
    );
}

export default Quiz;
