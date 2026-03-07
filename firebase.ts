// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1OHrLPpZnNvDQnKe8faoyVjCMscR8aso",
  authDomain: "zenergy-f62e8.firebaseapp.com",
  projectId: "zenergy-f62e8",
  storageBucket: "zenergy-f62e8.firebasestorage.app",
  messagingSenderId: "1008707188658",
  appId: "1:1008707188658:web:ba0f988b614fd67a8c56ab",
  measurementId: "G-7PYFPQ543N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

//  Google Provider 
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
// Firestore
export const db = getFirestore(app);

//storage
export const storage = getStorage(app);