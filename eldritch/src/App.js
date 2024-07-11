import React, { useState } from 'react';
import './App.css';
import Quiz from './Quiz';
import { fetchQuizData } from './fetchQuizData';
//hi
function App() {
    const [numQuestions, setNumQuestions] = useState(4);
    const [questionType, setQuestionType] = useState('multiple choice');
    const [topic, setTopic] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(parseInt(event.target.value, 10));
    };

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
    };

    const handleTopicChange = (event) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9- ]*$/;
        if (value.trim() === '') {
            setErrorMessage('Topic cannot be empty');
        } else if (!regex.test(value)) {
            setErrorMessage('Topic contains invalid characters');
        } else if (value.length < 3 || value.length > 30) {
            setErrorMessage('Topic must be between 3 and 30 characters');
        } else {
            setErrorMessage('');
        }
        setTopic(value);
    };

    const handleConfirm = async () => {
        if (errorMessage || topic.trim() === '') {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } else {
            setLoading(true);
            try {
                const quizData = await fetchQuizData(questionType, numQuestions, topic);
                if (quizData.error) {
                    setErrorMessage(quizData.error);
                    setShowPopup(true);
                    setTimeout(() => setShowPopup(false), 3000);
                } else {
                    setQuizStarted(true);
                }
            } catch (error) {
                setErrorMessage('Failed to fetch quiz data');
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
            }
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Quiz! App</h1>
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
                        <input
                            type="text"
                            value={topic}
                            onChange={handleTopicChange}
                            placeholder="Enter the topic for the quiz"
                        />
                    </label>
                    <br />
                    {showPopup && (
                        <div className="popup">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <button onClick={handleConfirm}>Confirm</button>
                    {loading && <div className="loading">Generating Questions...</div>}
                </div>
            ) : (
                <Quiz numQuestions={numQuestions} questionType={questionType} topic={topic} />
            )}
        </div>
    );
}

export default App;
