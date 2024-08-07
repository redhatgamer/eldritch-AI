// src/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/mainpage');
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToWelcome = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {passwordVisible ? '🙈' : '👁️'}
          </span>
        </div>
        <button type="submit">Signup</button>
      </form>
      <p className="login-prompt">Already have an account? <button className="login-button" onClick={navigateToLogin}>Login</button></p>
      <button className="welcome-button" onClick={navigateToWelcome}>Back to Welcome</button>
    </div>
  );
}

export default Signup;
