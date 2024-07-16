// src/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="animated-text">Welcome to the Quiz App</h1>
      <p className="description">
        Enhance your learning with our AI-powered quiz generator.
      </p>
      <div className="buttons-container">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Welcome;
