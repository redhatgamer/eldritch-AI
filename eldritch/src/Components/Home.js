import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to My React App</h2>
            <nav>
                <ul>
                    <li><Link to="/quiz">Take Quiz</Link></li>
                    <li><Link to="/gemini-data">View Gemini Data</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;