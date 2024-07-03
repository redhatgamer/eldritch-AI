import React, { useState } from 'react';
import './App.css';
import Quiz from './Quiz';

function App() {
    const [numQuestions, setNumQuestions] = useState(8); // Default to 8 questions

    const handleSelectChange = (event) => {
        setNumQuestions(parseInt(event.target.value, 10));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Quiz App</h1>
            </header>
            <div>
                <label>
                    Number of Questions:
                    <select value={numQuestions} onChange={handleSelectChange}>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                    </select>
                </label>
                <p>You have selected: {numQuestions} questions</p>
            </div>
            <Quiz />
        </div>
    );
}

export default App;