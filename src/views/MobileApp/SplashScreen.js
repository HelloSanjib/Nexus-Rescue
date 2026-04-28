import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--bg-white)', color: 'var(--primary-red)',
      padding: '20px', textAlign: 'center'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Shield size={100} color="var(--primary-red)" fill="none" strokeWidth={1} style={{ marginBottom: '20px' }} />
        <h1 style={{ margin: '0 0 5px 0', fontSize: '2.5rem', fontWeight: 900 }}>NEXUS<span style={{ color: 'var(--text-light)' }}>-RESCUE</span></h1>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-light)' }}>
          Bridging the Silence in the Golden Hour.
        </p>
      </div>
      
      {/* Heartbeat line graphic mock */}
      <div style={{ width: '100%', height: '150px', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 375 150" width="100%" height="100%" preserveAspectRatio="none">
          <path d="M 0 100 L 100 100 L 120 100 L 130 50 L 150 140 L 170 100 L 250 100 L 260 70 L 280 120 L 290 100 L 375 100" 
            stroke="var(--primary-red)" strokeWidth="4" fill="none" opacity="0.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
