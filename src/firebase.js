import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB81hrOj84I6eyWgc7RYiOU2Br8hvPyyck",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "nexus-rescue-5b27b.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "nexus-rescue-5b27b",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "nexus-rescue-5b27b.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "454012902294",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:454012902294:web:28e630e72ef39b420a1bb7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
