// src/Profile.js
import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>User Profile</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          {/* Add more profile details here */}
        </div>
        <div className="profile-actions">
          <button className="edit-profile-btn">Edit Profile</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
