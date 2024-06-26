import React from 'react';
import './MainPage.css';

function MainPage() {
    return (
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
                    <p>The Ultimate Yu-Gi-Oh! Simulator.</p>
                    <button className="github-btn">View Project on GitHub</button>
                </div>
                <div className="right-content">
                    <img src="path/to/your/image.png" alt="Logo" className="main-logo" />
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
    );
}

export default MainPage;
