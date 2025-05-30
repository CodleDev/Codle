// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZqs5HlIqmW_7a45tFNy01tECJylDWyIw",
  authDomain: "codle-bcbe1.firebaseapp.com",
  projectId: "codle-bcbe1",
  storageBucket: "codle-bcbe1.firebasestorage.app",
  messagingSenderId: "7680782260",
  appId: "1:7680782260:web:aab79ca46504cff6928ce1",
  measurementId: "G-KG8MWCQHVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);