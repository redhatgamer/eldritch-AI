import React, { useState } from 'react';
//import React from 'react';
import './App.css';
import Quiz from './Quiz';
import QuestionType from './typeOfQuestion';

function App() {
    const [questionType, setQuestionType] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);


    const handleQuestionTypeChange = (selectedValue) => {
        setQuestionType(selectedValue);
        // Additional logic based on question type selected
    };

    const handleSubmit = () => {
        setShowQuiz(true);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Quiz App</h1>
            </header>


            {/* conditional rendering, quiz will only start once start quiz button is pressed */}
            {!showQuiz ? (
                <>
                    <QuestionType
                        label="Question type"
                        options={["true/false", "Multiple Choice", "Both"]}
                        onChange={handleQuestionTypeChange}
                />
                    <p>Selected type of questions: {questionType}</p>
                    
                    <input
                        label="mySubmit"
                        type="button"
                        value="Start Quiz"
                        onClick={handleSubmit}
                    />
                </>
            ) : (
                <Quiz questionType={questionType} />
            )}
        </div>
    );
}

export default App;
