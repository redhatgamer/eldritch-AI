import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';

const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris'
    },
    {
        question: 'What is 2 + 2?',
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
    const [quizStarted, setQuizStarted] = useState(false);
    const [timer, setTimer] = useState(0); // Timer state in seconds
    const [timePerQuestion, setTimePerQuestion] = useState(2 * 60); // Default time per question in seconds

    useEffect(() => {
        if (timer === 0 && quizStarted && currentQuestionIndex < quizData.length) {
            setTimer(timePerQuestion);
        }
    }, [timer, quizStarted, currentQuestionIndex, timePerQuestion]);

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
        <div>
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
                <div>
                    <h1>Your score: {score}/{quizData.length}</h1>
                </div>
            ) : (
                quizStarted && (
                    <div>
                        <Question
                            question={quizData[currentQuestionIndex].question}
                            options={quizData[currentQuestionIndex].options}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                        />
                        <Timer key={currentQuestionIndex} initialTime={timer} onTimeUp={handleTimeUp} />
                        <button onClick={handleNextQuestion}>Next</button>
                    </div>
                )
            )}
        </div>
    );
}

export default Quiz;
