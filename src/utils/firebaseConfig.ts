// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCosI7-nkxCoUcOhNBJgPpHSmxavEcbTZA",
  authDomain: "whats-app-chat-84e62.firebaseapp.com",
  projectId: "whats-app-chat-84e62",
  storageBucket: "whats-app-chat-84e62.appspot.com",
  messagingSenderId: "306211494385",
  appId: "1:306211494385:web:9d1eeffd676c9e9e1bcc50",
  measurementId: "G-9D7MKTWB5S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
