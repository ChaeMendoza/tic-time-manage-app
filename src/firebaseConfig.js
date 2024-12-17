// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALBPNmA6SWxjetFE0eEj-KzFVwNWSTnlQ",
  authDomain: "tic-time-app.firebaseapp.com",
  projectId: "tic-time-app",
  storageBucket: "tic-time-app.firebasestorage.app",
  messagingSenderId: "467997828702",
  appId: "1:467997828702:web:4c75a275d7251cfcbeb6cf",
  measurementId: "G-69GK61ZWYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);