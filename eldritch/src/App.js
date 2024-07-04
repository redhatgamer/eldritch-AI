import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import Quiz from './Quiz';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/quiz" element={<Quiz />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
