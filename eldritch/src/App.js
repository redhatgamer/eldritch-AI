import React, { useState } from 'react';
import './App.css';
import Quiz from './Quiz';

function App() {
    const [numQuestions, setNumQuestions] = useState(4);
    const [questionType, setQuestionType] = useState('multiple choice');
    const [topic, setTopic] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(parseInt(event.target.value, 10));
    };

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
    };

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };

    const handleConfirm = () => {
        setQuizStarted(true);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Quiz App</h1>
            </header>
            {!quizStarted ? (
                <div>
                    <label>
                        Number of Questions:
                        <select value={numQuestions} onChange={handleNumQuestionsChange}>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Type of Questions:
                        <select value={questionType} onChange={handleQuestionTypeChange}>
                            <option value="multiple choice">Multiple Choice</option>
                            <option value="true/false">True/False</option>
                            <option value="both">Both</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Topic:
                        <input type="text" value={topic} onChange={handleTopicChange} />
                    </label>
                    <br />
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            ) : (
                <Quiz numQuestions={numQuestions} questionType={questionType} topic={topic} />
            )}
        </div>
    );
}

export default App;