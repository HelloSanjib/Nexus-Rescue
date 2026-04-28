import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ResponderHome from './ResponderHome';
import ResponderMap from './ResponderMap';
import { Home as HomeIcon, Map as MapIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ResponderLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
      <div style={{ width: '375px', height: '812px', backgroundColor: 'var(--bg-white)', borderRadius: '40px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden', position: 'relative', border: '8px solid #000', display: 'flex', flexDirection: 'column' }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '150px', height: '30px', backgroundColor: '#000', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', zIndex: 999 }} />
        
        {/* Header */}
        <div style={{ padding: '50px 20px 20px', backgroundColor: '#ff9800', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Responder Unit</h2>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>{user.name}</p>
          </div>
          <LogOut size={24} onClick={logout} style={{ cursor: 'pointer' }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, width: '100%', overflowY: 'auto', backgroundColor: 'var(--bg-white)' }}>
          <Routes>
            <Route path="/" element={<ResponderHome />} />
            <Route path="/map" element={<ResponderMap />} />
          </Routes>
        </div>

        {/* Bottom Nav */}
        <div style={{ height: '80px', backgroundColor: 'var(--bg-white)', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '20px', zIndex: 10 }}>
          <NavBtn icon={<HomeIcon />} label="Dispatches" active={location.pathname === '/'} onClick={() => navigate('/')} />
          <NavBtn icon={<MapIcon />} label="Navigation" active={location.pathname === '/map'} onClick={() => navigate('/map')} />
        </div>
      </div>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: active ? '#ff9800' : 'var(--text-muted)', background: 'transparent', border: 'none', padding: '10px' }}>
      {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
      <span style={{ fontSize: '10px', fontWeight: active ? 'bold' : 'normal' }}>{label}</span>
    </button>
  );
}
