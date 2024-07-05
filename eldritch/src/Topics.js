import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Topics.css';

function Topics() {
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState('');

    const topics = ['Science', 'History', 'Math', 'Literature', 'Technology'];

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
    };

    const handleStartQuiz = () => {
        if (selectedTopic) {
            navigate(`/quiz?topic=${selectedTopic}`);
        }
    };

    return (
        <div className="topics-page">
            <h1>Select a Topic</h1>
            <div className="topics-list">
                {topics.map((topic) => (
                    <div
                        key={topic}
                        className={`topic-item ${selectedTopic === topic ? 'selected' : ''}`}
                        onClick={() => handleTopicSelect(topic)}
                    >
                        {topic}
                    </div>
                ))}
            </div>
            <button className="start-quiz-btn" onClick={handleStartQuiz} disabled={!selectedTopic}>
                Start Quiz
            </button>
        </div>
    );
}

export default Topics;
