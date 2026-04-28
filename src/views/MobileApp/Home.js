import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MapPin, Mic, Camera, Bell, Shield } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export default function Home() {
  const navigate = useNavigate();
  const { setIsMenuOpen } = useEmergency();

  const [shared, setShared] = React.useState(false);

  const handleShareLocation = () => {
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-white)', color: 'var(--text-light)' }}>
      {/* App Bar */}
      <div style={{ padding: '50px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
        <Menu size={24} color="var(--primary-red)" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="Logo" style={{ width: 20, height: 20, borderRadius: '4px' }} />
          <h3 style={{ margin: 0, color: 'var(--primary-red)', fontWeight: 'bold' }}>Nexus Rescue</h3>
        </div>
        <Bell size={24} color="var(--primary-red)" />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', position: 'relative' }}>
        
        {shared && (
          <div style={{
            position: 'absolute', top: '10px', backgroundColor: 'var(--success)', color: 'white',
            padding: '10px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)', animation: 'slideDown 0.3s ease-out', zIndex: 100
          }}>
            Location Shared with Emergency Services
          </div>
        )}

        {/* Giant Panic Button */}
        <button 
          onClick={() => navigate('/triage')}
          style={{
            width: '240px', height: '240px', borderRadius: '50%',
            backgroundColor: 'var(--primary-red)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(229, 57, 53, 0.4)',
            color: 'white', transition: 'transform 0.1s', marginBottom: '40px'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '32px', fontWeight: 900, marginBottom: '5px' }}>PANIC</span>
          <span style={{ fontSize: '32px', fontWeight: 900, marginBottom: '10px' }}>BUTTON</span>
          <span style={{ fontSize: '14px', fontWeight: 'normal' }}>Tap in Emergency</span>
        </button>

        {/* 3 Icons Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 10px', marginBottom: '40px' }}>
          <ActionIcon icon={<MapPin size={28} color="white" />} label="Share location" bgColor="#2196f3" onClick={handleShareLocation} />
          <ActionIcon icon={<Mic size={28} color="white" />} label="Voice Alert" bgColor="#ffb300" onClick={() => navigate('/triage')} />
          <ActionIcon icon={<Camera size={28} color="white" />} label="Capture Image" bgColor="#4caf50" onClick={() => navigate('/triage')} />
        </div>

        {/* My Safety Button */}
        <button 
          onClick={() => navigate('/map')}
          style={{
          width: '100%', padding: '15px', borderRadius: '30px',
          border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-white)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
          color: 'var(--text-light)', fontWeight: 'bold', fontSize: '16px'
        }}>
          <Shield size={20} color="var(--text-light)" /> My Safety
        </button>

      </div>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ActionIcon({ icon, label, bgColor, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        {icon}
      </div>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}
