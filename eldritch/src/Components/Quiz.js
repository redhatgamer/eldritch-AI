import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const navigate = useNavigate(); // Updated usage

    // Replace this with your AI or static questions fetching logic
    useEffect(() => {
        const fetchQuestions = async () => {
            // Fetch questions from your service
            const fetchedQuestions = [
                {
                    question: 'What is the capital of France?',
                    answers: [
                        { text: 'Paris', isCorrect: true },
                        { text: 'London', isCorrect: false },
                        { text: 'Rome', isCorrect: false },
                        { text: 'Berlin', isCorrect: false },
                    ],
                },
                // Add more questions here
            ];
            setQuestions(fetchedQuestions);
        };

        fetchQuestions();
    }, []);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            navigate('/results', { state: { score, total: questions.length } }); // Updated usage
        }
    };

    if (!questions.length) return <div>Loading...</div>;

    return (
        <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div>
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswerOptionClick(answer.isCorrect)}>
                        {answer.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;