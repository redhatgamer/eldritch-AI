import React, { useState } from 'react';
import axios from 'axios';
import './Quiz.css';
import { fetchQuizData } from './fetchQuizData'; // Import the fetchQuizData function

function Quiz() {
    const [numQuestions, setNumQuestions] = useState(4);
    const [questionType, setQuestionType] = useState('multiple choice');
    const [topic, setTopic] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [timePerQuestion, setTimePerQuestion] = useState(2 * 60); // Default time per question in seconds
    const [quizData, setQuizData] = useState(null); // State to store quiz data
    const [quizStarted, setQuizStarted] = useState(false); // State to manage quiz start
    const [selectedAnswers, setSelectedAnswers] = useState({}); // State to store selected answers
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to manage the current question index
    const [quizCompleted, setQuizCompleted] = useState(false); // State to manage quiz completion

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(parseInt(event.target.value, 10));
    };

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
    };

    const handleTopicChange = (event) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9-]*$/;
        if (value.trim() === '') {
            setErrorMessage('Topic cannot be empty');
        } else if (!regex.test(value)) {
            setErrorMessage('Topic contains invalid characters');
        } else if (value.length < 3 || value.length > 30) {
            setErrorMessage('Topic must be between 3 and 30 characters');
        } else {
            setErrorMessage('');
        }
        setTopic(value);
    };

    const handleTimerChange = (event) => {
        const newMinutes = parseInt(event.target.value, 10);
        setTimePerQuestion(newMinutes * 60); // Convert minutes to seconds
    };

    const handleConfirm = async () => {
        if (errorMessage || topic.trim() === '') {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        } else {
            // Fetch the quiz data using the API
            try {
                const data = await fetchQuizData(questionType, numQuestions, topic);
                setQuizData(data); // Store the quiz data
                setQuizStarted(true); // Set the quiz as started
                console.log('Quiz created successfully:', data);
            } catch (error) {
                console.error('Error creating quiz:', error);
                setErrorMessage('Failed to create quiz. Please try again.');
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
            }
        }
    };

    const handleOptionClick = (optionIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: optionIndex,
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true); // Mark quiz as completed if it's the last question
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        quizData.forEach((question, index) => {
            if (selectedAnswers[index] !== undefined && question.options[selectedAnswers[index]] === question.answer) {
                score += 1;
            }
        });
        return score;
    };

    const renderCurrentQuestion = () => {
        if (!quizData || currentQuestionIndex >= quizData.length) return null;

        const question = quizData[currentQuestionIndex];

        return (
            <div className="quiz-question">
                <p>{question.question}</p>
                <ul>
                    {question.options.map((option, optionIndex) => (
                        <li
                            key={optionIndex}
                            className={selectedAnswers[currentQuestionIndex] === optionIndex ? 'selected' : ''}
                            onClick={() => handleOptionClick(optionIndex)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                <div className="navigation-buttons">
                    <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                    <button onClick={handleNextQuestion}>{currentQuestionIndex === quizData.length - 1 ? 'Submit' : 'Next'}</button>
                </div>
            </div>
        );
    };

    const renderSummary = () => {
        const score = calculateScore();
        return (
            <div className="quiz-summary">
                <h2>Quiz Summary</h2>
                <p>You scored {score} out of {quizData.length}.</p>
                <ul>
                    {quizData.map((question, index) => (
                        <li key={index}>
                            <p>{question.question}</p>
                            <p>Your answer: {question.options[selectedAnswers[index]]}</p>
                            <p>Correct answer: {question.answer}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div>
            {!quizStarted ? (
                <div className="dropdown-container-wrapper">
                    <div className="dropdown-container">
                        <div>
                            <label>
                                Topic:
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={handleTopicChange}
                                    placeholder="Enter the topic for the quiz"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Number of Questions:
                                <select value={numQuestions} onChange={handleNumQuestionsChange}>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Type of Questions:
                                <select value={questionType} onChange={handleQuestionTypeChange}>
                                    <option value="multiple choice">Multiple Choice</option>
                                    <option value="true/false">True/False</option>
                                    <option value="both">Both</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Select time per question (minutes):
                                <select value={timePerQuestion / 60} onChange={handleTimerChange}>
                                    <option value="2">2</option>
                                    <option value="5">5</option>
                                    <option value="8">8</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="popup">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            ) : quizCompleted ? (
                renderSummary()
            ) : (
                renderCurrentQuestion()
            )}
        </div>
    );
}

export default Quiz;
