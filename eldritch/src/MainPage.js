import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
    const navigate = useNavigate();

    const navigateToQuiz = () => {
        navigate('/quiz');
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
                <div className="header">
                    <div className="logo">Eldritch-AI</div>
                    <nav className="nav-links">
                        <a href="#">Download</a>
                        <a href="#">System Requirements</a>
                        <a href="#">Donations</a>
                        <button className="discord-btn">Join our Discord</button>
                    </nav>
                </div>
                <div className="content">
                    <div className="left-content">
                        <h1>Eldritch-AI</h1>
                        <p>The Ultimate Quiz Simulator.</p>
                        <button className="github-btn">View Project on GitHub</button>
                        <button onClick={navigateToQuiz}>Start Quiz</button>
                    </div>
                    <div className="right-content">
                        <img src="" alt="Logo" className="main-logo" />
                    </div>
                </div>
                <div className="download-section">
                    <p>DOWNLOAD FOR YOUR SYSTEM:</p>
                    <div className="download-buttons">
                        <button>Windows</button>
                        <button>Linux</button>
                        <button>Mac</button>
                        <button>Android</button>
                        <button>iOS</button>
                        <button>Premium Themes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
