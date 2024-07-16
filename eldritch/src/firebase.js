// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq0gNzchSe1HJ9ZYPAQAkCZPfS_47E9-s",
  authDomain: "beta-20431.firebaseapp.com",
  projectId: "beta-20431",
  storageBucket: "beta-20431.appspot.com",
  messagingSenderId: "477816248456",
  appId: "1:477816248456:web:085cb3f56f797a3c18673d",
  measurementId: "G-5PV6MFW846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };