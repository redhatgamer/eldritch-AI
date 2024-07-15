// src/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  const navigateToQuiz = () => {
    navigate('/quiz');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateHome = () => {
    navigate('/mainpage');
  };

  return (
    <div className="main-page">
      <div className="background">
        <div className="shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
        </div>
      </div>
      <div className="main-container">
        <header className="header">
          <div className="logo">Eldritch-AI</div>
          <nav className="nav-links">
            <a href="#">Download</a>
            <a href="#">System Requirements</a>
            <a href="#">Donations</a>
            <button className="discord-btn">Join our Discord</button>
            <button className="profile-btn" onClick={navigateToProfile}>Profile</button>
            <button className="home-btn" onClick={navigateHome}>Home</button>
          </nav>
        </header>
        <section className="content">
          <div className="left-content">
            <h1>Eldritch-AI</h1>
            <p>The Ultimate Quiz Simulator</p>
            <div className="button-group">
              <button className="github-btn">View Project on GitHub</button>
              <button className="topics-btn" onClick={navigateToQuiz}>Choose Quiz</button>
            </div>
          </div>
          <div className="right-content">
            <img src="https://via.placeholder.com/150" alt="Logo" className="main-logo" />
          </div>
        </section>
        <div className="grid-container">
          <section className="features-section">
            <h2>Features</h2>
            <ul>
              <li>AI-Powered Quiz Generation</li>
              <li>Customizable Question Sets</li>
              <li>Real-Time Feedback</li>
              <li>Detailed Performance Analytics</li>
              <li>Multi-Language Support</li>
            </ul>
          </section>
          <section className="benefits-section">
            <h2>Benefits</h2>
            <p>Eldritch-AI enhances learning through adaptive quizzes that cater to individual learning styles. Our platform helps you to:</p>
            <ul>
              <li>Improve retention with personalized quizzes</li>
              <li>Track progress with comprehensive analytics</li>
              <li>Engage with interactive and dynamic content</li>
              <li>Prepare for exams with confidence</li>
            </ul>
          </section>
        </div>
        <section className="download-section">
          <p>DOWNLOAD FOR YOUR SYSTEM:</p>
          <div className="download-buttons">
            <button>Windows</button>
            <button>Linux</button>
            <button>Mac</button>
            <button>Android</button>
            <button>iOS</button>
            <button>Premium Themes</button>
          </div>
        </section>
        <footer className="footer">
          <p>&copy; 2024 Eldritch-AI. All rights reserved.</p>
          <nav className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}

export default MainPage;
