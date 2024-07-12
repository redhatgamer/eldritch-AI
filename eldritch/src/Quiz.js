import React, { useState, useEffect } from 'react';
import Question from './Question';
import { fetchQuizData } from './fetchQuizData';
import Timer from './Timer';
import QuizSummary from './QuizSummary'; // Import the QuizSummary component

function Quiz({ numQuestions, questionType, topic, timePerQuestion }) {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(timePerQuestion); // Timer state in seconds
    const [userAnswers, setUserAnswers] = useState([]); // State to store user's answers

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
        // Store the user's answer
        setUserAnswers([...userAnswers, { question: quizData[currentQuestionIndex].question, userAnswer: selectedOption, correctAnswer: quizData[currentQuestionIndex].answer }]);
        
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
        // Store the user's answer
        setUserAnswers([...userAnswers, { question: quizData[currentQuestionIndex].question, userAnswer: selectedOption, correctAnswer: quizData[currentQuestionIndex].answer }]);

        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimer(timePerQuestion); // Restart timer
        } else {
            setShowScore(true);
        }
    };

    return (
        React.createElement("div", { className: "container" },
            showScore ? (
                React.createElement(QuizSummary, { userAnswers: userAnswers, score: score, totalQuestions: quizData.length })
            ) : (
                React.createElement("div", { className: "quiz-content" },
                    quizData.length > 0 && (
                        React.createElement(Question, {
                            question: quizData[currentQuestionIndex].question,
                            options: quizData[currentQuestionIndex].options,
                            selectedOption: selectedOption,
                            onOptionSelect: handleOptionSelect
                        })
                    ),
                    React.createElement(Timer, { key: currentQuestionIndex, initialTime: timer, onTimeUp: handleTimeUp }),
                    React.createElement("button", { onClick: handleNextQuestion }, "Next")
                )
            )
        )
    );
}

export default Quiz;
