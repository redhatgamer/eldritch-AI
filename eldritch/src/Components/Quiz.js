import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const history = useHistory();

    useEffect(() => {
        // Fetch questions from an API or a static file
        axios.get('/path-to-questions-api')
            .then(response => setQuestions(response.data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            history.push('/results', { score, total: questions.length });
        }
    };

    if (!questions.length) return <div>Loading...</div>;

    return (
        <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div>
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswerOptionClick(answer.isCorrect)}>
                        {answer.answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
