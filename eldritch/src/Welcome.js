// src/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to the Quiz App</h1>
      <p className="description">
        Enhance your learning with our AI-powered quiz generator. Whether you're preparing for exams or just looking to test your knowledge, our app provides a comprehensive and adaptive learning experience.
      </p>
      <div className="buttons-container">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
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
        <p>Our app helps you to:</p>
        <ul>
          <li>Improve retention with personalized quizzes</li>
          <li>Track progress with comprehensive analytics</li>
          <li>Engage with interactive and dynamic content</li>
          <li>Prepare for exams with confidence</li>
        </ul>
      </section>
      <section className="testimonials-section">
        <h2>User Testimonials</h2>
        <blockquote>"This app has transformed my study routine. The quizzes are spot-on!" - Alex</blockquote>
        <blockquote>"I love the real-time feedback feature. It helps me understand my mistakes instantly." - Jamie</blockquote>
      </section>
      <section className="faq-section">
        <h2>FAQs</h2>
        <div className="faq-item">
          <h3>How do I create an account?</h3>
          <p>Click on the 'Sign Up' button and fill in your details to create a new account.</p>
        </div>
        <div className="faq-item">
          <h3>Can I customize the quizzes?</h3>
          <p>Yes, you can choose the number of questions, question types, and topics for your quizzes.</p>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
