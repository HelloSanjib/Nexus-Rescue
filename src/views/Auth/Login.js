import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, HardHat } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please enter email and password');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return setError('Please enter a valid email address.');

    try {
      setError('');
      await login(email, password);
      navigate('/home');
    } catch (err) {
      let friendlyError = 'Failed to log in or register.';
      if (err.code === 'auth/invalid-email') friendlyError = 'Invalid email address format.';
      if (err.code === 'auth/weak-password') friendlyError = 'Password should be at least 6 characters.';
      if (err.code === 'auth/email-already-in-use') friendlyError = 'This email is already registered but login failed.';
      
      setError(friendlyError + ' (' + (err.code || err.message) + ')');
    }
  };

  const handleQuickLogin = async (roleEmail) => {
    try {
      setError('');
      await login(roleEmail, 'password123');
      navigate('/home');
    } catch (err) {
      setError(`Quick login failed. Ensure ${roleEmail} is created in Firebase Auth with password 'password123'.`);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', backgroundColor: '#f0f2f5', fontFamily: 'var(--font-main)' }}>
      {/* Left Branding Side */}
      <div style={{ flex: 1, backgroundColor: 'var(--primary-red)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        <img src="/logo.png" alt="Nexus Rescue Logo" style={{ width: '120px', height: '120px', borderRadius: '20px', marginBottom: '20px', backgroundColor: 'white', padding: '5px' }} />
        <h1 style={{ fontSize: '48px', margin: '0 0 10px 0' }}>Nexus Rescue</h1>
        <p style={{ fontSize: '18px', opacity: 0.9, textAlign: 'center', maxWidth: '400px' }}>
          Bridging the Silence in the Golden Hour. Advanced AI-powered emergency management.
        </p>
      </div>

      {/* Right Login Side */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', backgroundColor: 'white' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '10px', color: 'var(--text-dark)' }}>Welcome</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Please log in or create an account.</p>

          {error && <div style={{ color: 'white', backgroundColor: 'var(--primary-red)', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '16px', boxSizing: 'border-box' }} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '16px', boxSizing: 'border-box' }} 
            />
            <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary-red)', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 10px rgba(229, 57, 53, 0.3)' }}>
              Sign In / Register
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }}></div>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>OR QUICK LOGIN / REGISTER AS</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <LoginBtn icon={<Shield />} label="Citizen User" onClick={() => handleQuickLogin('citizen@nexus-rescue.com')} color="#2196f3" />
            <LoginBtn icon={<HardHat />} label="Emergency Responder" onClick={() => handleQuickLogin('responder@nexus-rescue.com')} color="#ff9800" />
            <LoginBtn icon={<Activity />} label="Admin / Authority" onClick={() => handleQuickLogin('admin@nexus-rescue.com')} color="var(--primary-red)" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginBtn({ icon, label, onClick, color }) {
  return (
    <button onClick={onClick} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: `2px solid ${color}`, backgroundColor: 'white', color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
      {icon} {label}
    </button>
  );
}
