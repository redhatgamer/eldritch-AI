import React, { useState, useEffect } from 'react';
import Question from './Question';
import { fetchQuizData } from './fetchQuizData'; 
import Timer from './Timer';

function Quiz({ numQuestions, questionType, topic }) {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timer, setTimer] = useState(0); // Timer state in seconds
    const [timePerQuestion, setTimePerQuestion] = useState(2 * 60); // Default time per question in seconds

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
        if (timer === 0 && quizStarted && currentQuestionIndex < quizData.length) {
            setTimer(timePerQuestion);
        }
    }, [timer, quizStarted, currentQuestionIndex, timePerQuestion, quizData.length]);

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

    const handleTimerChange = (event) => {
        const newMinutes = parseInt(event.target.value);
        setTimer(newMinutes * 60); // Convert minutes to seconds for Timer component
        setTimePerQuestion(newMinutes * 60);
    };

    const startQuiz = () => {
        setQuizStarted(true);
        setTimer(timePerQuestion); // Set timer for the first question
        setCurrentQuestionIndex(0);
        setShowScore(false);
        setScore(0);
    };

    return (
        <div className="container">
            {!quizStarted && (
                <div>
                    <label htmlFor="timeInput">Select time per question (minutes):</label>
                    <select id="timeInput" value={timePerQuestion / 60} onChange={handleTimerChange}>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="8">8</option>
                    </select>
                    <button onClick={startQuiz}>Start Quiz</button>
                </div>
            )}
            {showScore ? (
                <div className="score">
                    <h1>Your score: {score}/{quizData.length}</h1>
                </div>
            ) : (
                quizStarted && (
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
                )
            )}
        </div>
    );
}

export default Quiz;
