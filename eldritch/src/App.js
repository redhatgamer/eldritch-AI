// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Correct import
import { auth } from './firebase.js'; // Add .js extension
import Login from './Login.js'; // Add .js extension
import './App.css';
import MainPage from './MainPage.js'; // Add .js extension
import Quiz from './Quiz.js'; // Add .js extension
import Topics from './Topics.js'; // Add .js extension
import HomePage from './HomePage.js'; // Add .js extension
import Profile from './Profile.js'; // Add .js extension

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={user ? <MainPage /> : <Navigate to="/home" />} />
          <Route path="/topics" element={user ? <Topics /> : <Navigate to="/home" />} />
          <Route path="/quiz" element={user ? <Quiz /> : <Navigate to="/home" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
