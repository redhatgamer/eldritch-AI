// src/Profile.js

import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, updateUserProfile, signOut } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/home');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ displayName, photoURL });
      setMessage('Profile updated successfully.');
    } catch (error) {
      setMessage('Error updating profile: ' + error.message);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <img src={user.photoURL || 'https://via.placeholder.com/150'} alt="Profile" className="profile-picture" />
        <p>Email: {user.email}</p>
        <form onSubmit={handleUpdateProfile} className="profile-form">
          <label>
            Display Name:
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          <label>
            Photo URL:
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </label>
          <button type="submit" className="update-button">Update Profile</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>Completed Quiz: JavaScript Basics</li>
          <li>Scored 80% on Python Intermediate Quiz</li>
          <li>Started new Quiz: React Advanced</li>
        </ul>
      </div>
      <button onClick={handleGoHome} className="home-button">Home</button>
      <button onClick={handleSignOut} className="logout-button">Sign Out</button>
    </div>
  );
};

export default Profile;
