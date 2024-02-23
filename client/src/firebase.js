// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-e9d08.firebaseapp.com",
  projectId: "mern-auth-e9d08",
  storageBucket: "mern-auth-e9d08.appspot.com",
  messagingSenderId: "777395103528",
  appId: "1:777395103528:web:32d6858cbc4902157fd21d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);