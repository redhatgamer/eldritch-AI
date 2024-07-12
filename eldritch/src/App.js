// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './Login';
import './App.css';
import MainPage from './MainPage';
import Quiz from './Quiz';
import Topics from './Topics';
import HomePage from './HomePage';
import Profile from './Profile';

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
