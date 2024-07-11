import React, { useState, useEffect } from 'react';
import Question from './Question';
import { fetchQuizData } from './fetchQuizData';
import Timer from './Timer';

function Quiz({ numQuestions, questionType, topic, timePerQuestion }) {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
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

    return (
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