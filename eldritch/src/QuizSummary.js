import React from 'react';
import './QuizSummary.css'; // Import the CSS file

const QuizSummary = ({ userAnswers, score, totalQuestions }) => {
    return (
        React.createElement("div", { className: "quiz-summary" },
            React.createElement("h2", null, "Quiz Summary"),
            React.createElement("p", null, `Your score: ${score}/${totalQuestions}`),
            userAnswers.map((answer, index) => (
                React.createElement("div", { key: index, className: "flashcard" },
                    React.createElement("div", { className: "flashcard-header" }, // Apply header class
                        React.createElement("p", { className: "question-label" }, `Question ${index + 1}:`) // Display question number
                    ),
                    React.createElement("div", { className: "flashcard-content" },
                        React.createElement("p", { className: "question-text" }, answer.question),
                        React.createElement("p", null, React.createElement("strong", null, "Your Answer:"), ` ${answer.userAnswer}`),
                        React.createElement("p", null, React.createElement("strong", null, "Correct Answer:"), ` ${answer.correctAnswer}`),
                        answer.userAnswer === answer.correctAnswer ? (
                            React.createElement("p", { style: { color: '#15f773' } }, "Correct")
                        ) : (
                            React.createElement("p", { style: { color: 'red' } }, "Wrong")
                        )
                    )
                )
            ))
        )
    );
};

export default QuizSummary;

