import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import Home from './Home';
import AITriage from './AITriage';
import ThreatDetected from './ThreatDetected';
import SafetyMap from './SafetyMap';
import OfflineMode from './OfflineMode';
import AlertsList from './AlertsList';
import Profile from './Profile';
import { Home as HomeIcon, Map as MapIcon, Bell, User, Settings as SettingsIcon } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export default function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMenuOpen, setIsMenuOpen } = useEmergency();
  
  const showBottomNav = location.pathname === '/home' || location.pathname === '/map' || location.pathname === '/alerts' || location.pathname === '/offline' || location.pathname === '/profile';

  return (
    <div style={{
      width: '100%', height: '100%', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#f0f2f5'
    }}>
      <div style={{
        width: '375px', height: '812px', 
        backgroundColor: 'var(--bg-white)', 
        borderRadius: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        position: 'relative',
        border: '8px solid #000',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Dynamic Island / Notch Simulation */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '150px', height: '30px', backgroundColor: '#000',
          borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px',
          zIndex: 999
        }} />
        
        <div style={{ flex: 1, width: '100%', overflowY: 'auto', backgroundColor: 'var(--bg-white)', color: 'var(--text-light)' }}>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/triage" element={<AITriage />} />
            <Route path="/threat" element={<ThreatDetected />} />
            <Route path="/map" element={<SafetyMap />} />
            <Route path="/offline" element={<OfflineMode />} />
            <Route path="/alerts" element={<AlertsList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {showBottomNav && (
          <div style={{
            height: '80px', backgroundColor: 'var(--bg-white)', borderTop: '1px solid var(--border-light)',
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '20px', zIndex: 10
          }}>
            <NavBtn icon={<HomeIcon />} label="Home" active={location.pathname === '/home' || location.pathname === '/offline'} onClick={() => navigate('/home')} />
            <NavBtn icon={<MapIcon />} label="Map" active={location.pathname === '/map'} onClick={() => navigate('/map')} />
            <NavBtn icon={<Bell />} label="Alerts" active={location.pathname === '/alerts'} onClick={() => navigate('/alerts')} />
            <NavBtn icon={<User />} label="Profile" active={location.pathname === '/profile'} onClick={() => navigate('/profile')} />
          </div>
        )}

        {/* Sliding Drawer Menu */}
        {isMenuOpen && (
          <div 
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000
            }}
          >
            <div 
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: '250px',
                backgroundColor: 'var(--bg-white)', color: 'var(--text-light)',
                boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
                animation: 'slideIn 0.3s ease-out',
                display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ padding: '50px 20px 20px', backgroundColor: 'var(--primary-red)', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40, borderRadius: '8px', backgroundColor: 'white', padding: '2px' }} />
                  <div>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>Nexus Rescue</h2>
                    <p style={{ margin: '5px 0 0', fontSize: '10px', opacity: 0.8 }}>Emergency Management</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <DrawerItem icon={<HomeIcon />} label="Home" onClick={() => { setIsMenuOpen(false); navigate('/home'); }} />
                <DrawerItem icon={<MapIcon />} label="Safety Map" onClick={() => { setIsMenuOpen(false); navigate('/map'); }} />
                <DrawerItem icon={<Bell />} label="Alerts" onClick={() => { setIsMenuOpen(false); navigate('/alerts'); }} />
                <DrawerItem icon={<User />} label="Profile" onClick={() => { setIsMenuOpen(false); navigate('/profile'); }} />
                <hr style={{ width: '100%', border: 'none', borderTop: '1px solid var(--border-light)', margin: '10px 0' }} />
                <DrawerItem icon={<SettingsIcon />} label="Settings" onClick={() => { setIsMenuOpen(false); navigate('/profile'); }} />
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', 
      cursor: 'pointer', color: active ? 'var(--primary-red)' : 'var(--text-muted)',
      background: 'transparent', border: 'none', padding: '10px' 
    }}>
      {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
      <span style={{ fontSize: '10px', fontWeight: active ? 'bold' : 'normal' }}>{label}</span>
    </button>
  );
}

function DrawerItem({ icon, label, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', padding: '10px 0' }}>
      {React.cloneElement(icon, { size: 24, color: 'var(--text-muted)' })}
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{label}</span>
    </div>
  );
}
