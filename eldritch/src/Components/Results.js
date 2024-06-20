import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Updated import

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Updated usage
    const { score, total } = location.state || { score: 0, total: 0 };

    return (
        <div>
            <h2>Your Score</h2>
            <p>
                {score} out of {total}
            </p>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    );
};

export default Results;