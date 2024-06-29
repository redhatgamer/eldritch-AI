import React, { useState } from 'react';
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
    const [timer, setTimer] = useState(0); // Timer state in seconds
    const [timePerQuestion, setTimePerQuestion] = useState(1); // Default time per question in minutes

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

    const handleTimeUp = () => {
        handleNextQuestion();
    };

    const handleTimerChange = (event) => {
        const newMinutes = parseInt(event.target.value);
        setTimePerQuestion(newMinutes);
        setTimer(newMinutes * 60); // Convert minutes to seconds for Timer component
    };

    const startQuiz = () => {
        setTimer(timePerQuestion * 60); // Convert minutes to seconds
        setCurrentQuestionIndex(0);
        setShowScore(false);
    };

    return (
        <div>
            {!showScore && timer === 0 && (
                <div>
                    <label htmlFor="timeInput">Select time per question (minutes):</label>
                    <input
                        type="number"
                        id="timeInput"
                        value={timePerQuestion}
                        onChange={handleTimerChange}
                        min="1"
                        max="60"
                    />
                    <button onClick={startQuiz}>Start Quiz</button>
                </div>
            )}
            {showScore ? (
                <div>
                    <h1>Your score: {score}/{quizData.length}</h1>
                </div>
            ) : (
                <div>
                    {timer > 0 && (
                        <div>
                            <Question
                                question={quizData[currentQuestionIndex].question}
                                options={quizData[currentQuestionIndex].options}
                                selectedOption={selectedOption}
                                onOptionSelect={handleOptionSelect}
                            />
                            <Timer initialTime={timer} onTimeUp={handleTimeUp} />
                            <button onClick={handleNextQuestion}>Next</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Quiz;