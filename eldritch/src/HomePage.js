// src/HomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Eldritch-AI</h1>
      <button onClick={handleLoginClick} className="home-login-button">
        Login / Register
      </button>
    </div>
  );
};

export default HomePage;
