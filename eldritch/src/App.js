// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './Login';
import './App.css';
import MainPage from './MainPage';
import Quiz from './Quiz';
import Topics from './Topics';
import HomePage from './HomePage';
import Profile from './Profile';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={user ? <MainPage /> : <Navigate to="/home" />} />
          <Route path="/topics" element={user ? <Topics /> : <Navigate to="/home" />} />
          <Route path="/quiz" element={user ? <Quiz /> : <Navigate to="/home" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
    const [numQuestions, setNumQuestions] = useState(4);
    const [questionType, setQuestionType] = useState('multiple choice');
    const [topic, setTopic] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [timePerQuestion, setTimePerQuestion] = useState(2 * 60); // Default time per question in seconds

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(parseInt(event.target.value, 10));
    };

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
    };

    const handleTopicChange = (event) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9-]*$/;
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

    const handleTimerChange = (event) => {
        const newMinutes = parseInt(event.target.value, 10);
        setTimePerQuestion(newMinutes * 60); // Convert minutes to seconds
    };

    const handleConfirm = () => {
        if (errorMessage || topic.trim() === '') {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        } else {
            setQuizStarted(true);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Eldritch</h1>
            </header>
            {!quizStarted ? (
                <div>
                    <div className="dropdown-container-wrapper">
                        <div className="dropdown-container">
                             <div>
                                <label>
                                         
                                        <input
                                            type="text"
                                            value={topic }
                                            onChange={handleTopicChange}
                                            placeholder="Enter the topic for the quiz"
                                        />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Number of Questions: 
                                    <select value={numQuestions} onChange={handleNumQuestionsChange}>
                                        <option value="4">4</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Type of Questions:
                                    <select value={questionType} onChange={handleQuestionTypeChange}>
                                        <option value="multiple choice">Multiple Choice</option>
                                        <option value="true/false">True/False</option>
                                        <option value="both">Both</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Select time per question (minutes):
                                    <select value={timePerQuestion / 60} onChange={handleTimerChange}>
                                        <option value="2">2</option>
                                        <option value="5">5</option>
                                        <option value="8">8</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="popup">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            ) : (
                <Quiz numQuestions={numQuestions} questionType={questionType} topic={topic} timePerQuestion={timePerQuestion} />
            )}
        </div>
    );
}

export default App;
