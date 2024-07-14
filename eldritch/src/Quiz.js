import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css';

const fetchAIQuestions = async (topic) => {
    try {
        const response = await fetch(`/questions.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.questions;
    } catch (error) {
        console.error('Failed to fetch questions:', error);
        throw error;
    }
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
import Question from './Question';
import { fetchQuizData } from './fetchQuizData';
import Timer from './Timer';

function Quiz({ numQuestions, questionType, topic, timePerQuestion }) {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const topic = new URLSearchParams(location.search).get('topic') || 'default';

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const fetchedQuestions = await fetchAIQuestions(topic);
                setQuestions(fetchedQuestions);
                setLoading(false);
            } catch (error) {
                setError('Failed to load questions.');
                setLoading(false);
            }
        };
        getQuestions();
    }, [topic]);
    const [timer, setTimer] = useState(timePerQuestion); // Timer state in seconds

    useEffect(() => {
        async function generateQuiz() {
            try {
                const data = await fetchQuizData(questionType, numQuestions, topic);
                setQuizData(data);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        }
        generateQuiz();
    }, [numQuestions, questionType, topic]);

    useEffect(() => {
        if (timer === 0 && currentQuestionIndex < quizData.length) {
            setTimer(timePerQuestion);
        }
    }, [timer, currentQuestionIndex, timePerQuestion, quizData.length]);

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
            setTimer(timePerQuestion); // Restart the timer
        } else {
            setShowScore(true);
        }
    };

    const handleTimeUp = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimer(timePerQuestion); // Restart timer
        } else {
            setShowScore(true);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    if (loading) {
        return <div>Loading questions...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                        <button type="button" onClick={handleNextQuestion}>Next</button>
                        <button type="button" onClick={handleBackToHome} className="back-btn">Back to Home</button>
                    </div>
                ) : (
                    <div>No questions available.</div>
                )
        <div className="container">
            {showScore ? (
                <div className="score">
                    <h1>Your score: {score}/{quizData.length}</h1>
                </div>
            ) : (
                <div className="quiz-content">
                    {quizData.length > 0 && (
                        <Question
                            question={quizData[currentQuestionIndex].question}
                            options={quizData[currentQuestionIndex].options}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                        />
                    )}
                    <Timer key={currentQuestionIndex} initialTime={timer} onTimeUp={handleTimeUp} />
                    <button onClick={handleNextQuestion}>Next</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;