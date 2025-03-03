// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZocDZEijKWLl1zO3JJrVumMxowILh-ZY",
  authDomain: "my-astrosphere-project.firebaseapp.com",
  projectId: "my-astrosphere-project",
  storageBucket: "my-astrosphere-project.firebasestorage.app",
  messagingSenderId: "573506543455",
  appId: "1:573506543455:web:76e911fdabe3c5b32560ea",
  measurementId: "G-645R5P31V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ ตรวจสอบว่ามี `export { auth, provider };` อยู่
export { auth, provider };