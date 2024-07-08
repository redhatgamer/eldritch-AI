import React, { useState, useEffect } from 'react';
import Question from './Question';
import { fetchQuizData } from './fetchQuizData'; // Adjust the path if necessary

function Quiz({ numQuestions, questionType, topic }) {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

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

    return (
        <div>
            {showScore ? (
                <div>
                    <h1>Your score: {score}/{quizData.length}</h1>
                </div>
            ) : (
                <div>
                    {quizData.length > 0 && (
                        <Question
                            question={quizData[currentQuestionIndex].question}
                            options={quizData[currentQuestionIndex].options}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                        />
                    )}
                    <button onClick={handleNextQuestion}>Next</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;