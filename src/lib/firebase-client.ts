import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGRUIWpuGmHRgRH-SXHmF8n3WSRpeXQV0",
  authDomain: "tomys-kitchen.firebaseapp.com",
  projectId: "tomys-kitchen",
  storageBucket: "tomys-kitchen.firebasestorage.app",
  messagingSenderId: "688845926740",
  appId: "1:688845926740:web:5fffda536bf1679bc1d8c1",
  measurementId: "G-CRQR2R4R9M",
};

export const firebaseReady = Boolean(firebaseConfig.projectId);

export const firebaseApp = firebaseReady
  ? getApps()[0] ?? initializeApp(firebaseConfig)
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;
