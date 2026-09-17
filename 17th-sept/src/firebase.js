// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6aBkiEzopAJXMwq866L8lomHbhSb4jkM",
  authDomain: "th-sept-college-app.firebaseapp.com",
  projectId: "th-sept-college-app",
  storageBucket: "th-sept-college-app.firebasestorage.app",
  messagingSenderId: "1051423063190",
  appId: "1:1051423063190:web:038a4df9edcb7fedeb16b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);