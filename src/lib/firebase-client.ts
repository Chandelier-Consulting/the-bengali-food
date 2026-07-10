import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc-ceSvDfItj4ndimhCh6lz0_s07REFfo",
  authDomain: "the-bengali-food.firebaseapp.com",
  projectId: "the-bengali-food",
  storageBucket: "the-bengali-food.firebasestorage.app",
  messagingSenderId: "439739291044",
  appId: "1:439739291044:web:7c342926c4c244f4ce9d31",
  measurementId: "G-FQHSG9DJHS",
};

export const firebaseReady = Boolean(firebaseConfig.projectId);

export const firebaseApp = firebaseReady
  ? getApps()[0] ?? initializeApp(firebaseConfig)
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;
