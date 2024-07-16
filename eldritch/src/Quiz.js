import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './Quiz.css';
import { fetchQuizData } from './fetchQuizData'; // Import the fetchQuizData function
import Question from './Question'; // Import the updated Question component

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
    const [timeLeft, setTimeLeft] = useState(timePerQuestion); // State for the timer
    const [showFeedback, setShowFeedback] = useState(false); // State to show feedback
    const [points, setPoints] = useState(0); // State to track points
    const [achievements, setAchievements] = useState([]); // State to track achievements

    const navigate = useNavigate();

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(timePerQuestion); // Reset the timer
        } else {
            setQuizCompleted(true); // Mark quiz as completed if it's the last question
        }
    }, [currentQuestionIndex, quizData?.length, timePerQuestion]);

    useEffect(() => {
        if (quizStarted && !quizCompleted) {
            const timer = setTimeout(() => {
                if (timeLeft > 0) {
                    setTimeLeft(timeLeft - 1);
                } else {
                    handleNextQuestion();
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [quizStarted, quizCompleted, timeLeft, handleNextQuestion]);

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(parseInt(event.target.value, 10));
    };

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
    };

    const handleTopicChange = (event) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9-\s]*$/;
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
        setTimeLeft(newMinutes * 60); // Update the timer
    };

    const handleConfirm = async () => {
        if (errorMessage || topic.trim() === '') {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        } else {
            // Fetch the quiz data using the API
            try {
                const data = await fetchQuizData(questionType, numQuestions, topic);
                if (data.error) {
                    setErrorMessage(data.error);
                    setShowPopup(true);
                    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
                } else {
                    setQuizData(data); // Store the quiz data
                    setQuizStarted(true); // Set the quiz as started
                    setTimeLeft(timePerQuestion); // Initialize the timer
                    console.log('Quiz created successfully:', data);
                }
            } catch (error) {
                console.error('Error creating quiz:', error);
                setErrorMessage('Failed to create quiz. Please try again.');
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
            }
        }
    };

    const handleOptionClick = (optionIndex) => {
        const question = quizData[currentQuestionIndex];
        const correct = question.options[optionIndex] === question.answer;
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: optionIndex,
        });
        setPoints(points + (correct ? 10 : 0)); // Award points for correct answers
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
            handleNextQuestion();
        }, 1000); // Show feedback for 1 second before moving to the next question

        if (correct && points >= 50) {
            setAchievements([...achievements, '50 Points Achieved!']);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setTimeLeft(timePerQuestion); // Reset the timer
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const navigateHome = () => {
        navigate('/mainpage');
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
                <Question
                    question={question.question}
                    options={question.options}
                    selectedOption={selectedAnswers[currentQuestionIndex]}
                    onOptionSelect={(option) => handleOptionClick(option)}
                />
                <div className="navigation-buttons">
                    <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                    <button onClick={handleNextQuestion} disabled={currentQuestionIndex === quizData.length - 1 && !showFeedback}>Next</button>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
                    ></div>
                </div>
                <div className={`timer ${timeLeft <= 10 ? 'blink' : ''}`}>
                    Time left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                </div>
                {showFeedback && (
                    <div className={`feedback ${selectedAnswers[currentQuestionIndex] !== undefined && quizData[currentQuestionIndex].options[selectedAnswers[currentQuestionIndex]] === question.answer ? 'correct' : 'incorrect'}`}>
                        {selectedAnswers[currentQuestionIndex] !== undefined && quizData[currentQuestionIndex].options[selectedAnswers[currentQuestionIndex]] === question.answer ? 'Correct!' : 'Incorrect!'}
                    </div>
                )}
                <div className="points">
                    Points: {points}
                </div>
                <div className="achievements">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="achievement">{achievement}</div>
                    ))}
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
                <p>Total Points: {points}</p>
                <ul>
                    {quizData.map((question, index) => (
                        <li key={index}>
                            <p>{question.question}</p>
                            <p>Your answer: {question.options[selectedAnswers[index]]}</p>
                            <p>Correct answer: {question.answer}</p>
                        </li>
                    ))}
                </ul>
                <button className="home-btn" onClick={navigateHome}>Home</button>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        );
    };

    return (
        <div className="quiz-container">
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
                        {showPopup && (
                            <div className="popup">
                                <p>{errorMessage}</p>
                            </div>
                        )}
                        <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
                    </div>
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
