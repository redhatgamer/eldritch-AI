import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150'); // Default placeholder

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          console.log('Fetching profile data for user:', user.uid);
          const userDoc = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('Profile data fetched:', data);
            setProfilePicture(data.profilePicture || 'https://via.placeholder.com/150'); // Fallback to placeholder if no picture
          } else {
            console.log('No profile data found');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      } else {
        console.error('No user is authenticated');
      }
    };

    fetchProfileData();
  }, []);

  const navigateToQuiz = () => {
    navigate('/quiz');
  };

  const navigateToProfile = () => {
    navigate('/profile');
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
            <button className="discord-btn">Join our Discord</button>
            <button className="profile-btn" onClick={navigateToProfile}>Profile</button>
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
            <img src={profilePicture} alt="Logo" className="main-logo" />
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
        <section className="about-us-section">
          <h2>About Us</h2>
          <p>Meet Our Team:</p>
          <div className="team-members">
            <div className="team-member">
              <h3>Carlos Mejia</h3>
              <p>Role: <b>Team Lead/Lead Developer</b></p>
              <p>Fun Fact: I love listening to indie music. My favorite artists are TV Girl and Joy Again.</p>
            </div>
            <div className="team-member">
              <h3>Jeanfranco Pinto</h3>
              <p>Role: <b>AI Developer</b></p>
              <p>Fun Fact: I love cheering on the Venezuelan and Portuguese soccer teams. I love playing FIFA.</p>
            </div>
            <div className="team-member">
              <h3>Margarita Gutierrez</h3>
              <p>Role: <b>Front-End Developer</b></p>
              <p>Fun Fact: I am very proud of being in Colombian. I love aiding Hispanic women like myself to succeed in tech.</p>
            </div>
            <div className="team-member">
              <h3>Nicolas Marin</h3>
              <p>Role: <b>Backend Developer</b></p>
              <p>Fun Fact: My favorite team is Arsenal FC. I am into video games and technology.</p>
            </div>
          </div>
        </section>
        <footer className="footer">
          <p>&copy; 2024 Eldritch-AI. All rights reserved.</p>
          <nav className="footer-links">
            <button onClick={() => navigate('/privacy-policy')}>Privacy Policy</button>
            <button onClick={() => navigate('/terms-of-service')}>Terms of Service</button>
            <button onClick={() => navigate('/contact-us')}>Contact Us</button>
          </nav>
        </footer>
      </div>
    </div>
  );
}

export default MainPage;
