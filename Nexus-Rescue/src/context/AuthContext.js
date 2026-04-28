import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bypass onAuthStateChanged for development
    setLoading(false);
  }, []);

  const loginWithEmail = async (email, password) => {
    // Bypass Firebase Auth for instant login
    let role = 'citizen';
    if (email.includes('admin')) role = 'admin';
    if (email.includes('responder')) role = 'responder';
    
    const mockUser = {
      uid: 'mock-user-id-' + Date.now(),
      email: email,
      name: email.split('@')[0],
      role: role
    };
    
    setUser(mockUser);
    return mockUser;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login: loginWithEmail, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
