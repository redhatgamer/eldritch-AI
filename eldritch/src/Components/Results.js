import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const { score, total } = location.state;

    return (
        <div>
            <h1>Your Score: {score} / {total}</h1>
            <Link to="/">
                <button>Go Home</button>
            </Link>
        </div>
    );
};

export default Results;
