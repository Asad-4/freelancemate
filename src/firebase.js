import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAfluFciyaKQvfwG4l3llXT6KOZcvnXr_8",
    authDomain: "freelancemate-2d7be.firebaseapp.com",
    projectId: "freelancemate-2d7be",
    storageBucket: "freelancemate-2d7be.firebasestorage.app",
    messagingSenderId: "969770039020",
    appId: "1:969770039020:web:699c1234d7617a5917d7c9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);