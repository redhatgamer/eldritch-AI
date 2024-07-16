import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar-edit';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    email: user ? user.email : 'johndoe@example.com',
    bio: 'This is a sample bio.',
    interests: 'Coding, Gaming, Reading',
    profilePicture: 'https://via.placeholder.com/150', // Default profile picture
  });
  const [formData, setFormData] = useState(profileData);
  const [preview, setPreview] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
        try {
          const userDoc = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            console.log('Profile data fetched:', docSnap.data());
            setProfileData(docSnap.data());
            setFormData(docSnap.data());
          } else {
            console.log('No profile data found');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
      fetchProfileData();
    }
  }, [user]);

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(profileData); // Reset form data to profile data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileData(formData);
    setIsEditing(false);

    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, formData, { merge: true });
    }
  };

  const handleBack = () => {
    navigate('/mainpage');
  };

  const handleImgError = () => {
    setImgError(true);
  };

  const handleImgLoad = () => {
    setImgError(false);
  };

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 716800) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const handleSaveImage = () => {
    setFormData({
      ...formData,
      profilePicture: preview,
    });
    setPreview(null);
  };

  return (
    <div className="profile-page">
      <div className="background">
        <div className="shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
        </div>
      </div>
      <div className="profile-container">
        <h1>User Profile</h1>
        {isEditing ? (
          <form className="edit-profile-form" onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label>Profile Picture:</label>
              <Avatar
                width={390}
                height={295}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
                src={profileData.profilePicture}
              />
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" />
                  <button type="button" onClick={handleSaveImage}>Save Image</button>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Interests:</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled // Prevent email from being edited
              />
            </div>
            <div className="profile-actions">
              <button type="submit" className="save-profile-btn">Save</button>
              <button type="button" className="cancel-edit-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-info">
              <img
                src={imgError ? 'https://via.placeholder.com/150' : profileData.profilePicture}
                alt="Profile"
                className="profile-picture"
                onError={handleImgError}
                onLoad={handleImgLoad}
              />
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Bio:</strong> {profileData.bio}</p>
              <p><strong>Interests:</strong> {profileData.interests}</p>
            </div>
            <div className="profile-actions">
              <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
        <button className="back-btn" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default Profile;
