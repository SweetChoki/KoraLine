// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAg0h9InXjFpHiIM5jbOgebkq8fecyfgUM",
  authDomain: "koraline-dbfb0.firebaseapp.com",
  projectId: "koraline-dbfb0",
  storageBucket: "koraline-dbfb0.appspot.com",
  messagingSenderId: "970370397434",
  appId: "1:970370397434:web:dacf99d0f60e8583470543"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app)