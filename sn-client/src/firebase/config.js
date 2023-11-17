// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA2_mC3OL6vIxI2fVc23uf1GSDtT2FZsyg",
  authDomain: "desafiosn-421b9.firebaseapp.com",
  projectId: "desafiosn-421b9",
  storageBucket: "desafiosn-421b9.appspot.com",
  messagingSenderId: "1082936852035",
  appId: "1:1082936852035:web:2074191285abe5865fdef6",
  measurementId: "G-01DR51702Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
