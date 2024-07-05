import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css';

const fetchAIQuestions = async (topic) => {
    // Replace with your API endpoint or AI service call
    const response = await fetch(`/api/generate-questions?topic=${topic}`);
    const data = await response.json();
    return data.questions;
};

const Question = ({ question, options, selectedOption, onOptionSelect }) => (
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

function Quiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [questions, setQuestions] = useState([]);

    const topic = new URLSearchParams(location.search).get('topic');

    useEffect(() => {
        const getQuestions = async () => {
            const fetchedQuestions = await fetchAIQuestions(topic);
            setQuestions(fetchedQuestions);
        };
        getQuestions();
    }, [topic]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        setSelectedOption('');
        if (currentQuestionIndex < questions.length - 1) {
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
                    <h1>Your score: {score}/{questions.length}</h1>
                    <button onClick={handleBackToHome}>Back to Home</button>
                </div>
            ) : (
                questions.length > 0 ? (
                    <div className="question-wrapper">
                        <Question
                            question={questions[currentQuestionIndex].question}
                            options={questions[currentQuestionIndex].options}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                        />
                        <button onClick={handleNextQuestion}>Next</button>
                        <button onClick={handleBackToHome} className="back-btn">Back to Home</button>
                    </div>
                ) : (
                    <p>Loading questions...</p>
                )
            )}
        </div>
    );
}

export default Quiz;
