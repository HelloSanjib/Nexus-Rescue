import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, Settings, User as UserIcon, Shield } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { setIsMenuOpen } = useEmergency();
  const { logout, user } = useAuth();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-white)', color: 'var(--text-light)' }}>
      {/* App Bar */}
      <div style={{ padding: '50px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
        <Menu size={24} color="var(--primary-red)" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }} />
        <h3 style={{ margin: 0, color: 'var(--text-light)', fontWeight: 'bold' }}>MY PROFILE</h3>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', backgroundColor: 'var(--bg-light)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px', border: '2px solid var(--primary-red)' }}>
            <UserIcon size={50} color="var(--text-muted)" />
          </div>
          <h2 style={{ margin: '0 0 5px 0' }}>{user.name}</h2>
          <span style={{ color: 'var(--text-muted)' }}>ID: {user.id}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <ProfileRow icon={<Shield />} label="Emergency Contacts" />
          <ProfileRow icon={<Settings />} label="App Settings" />
          <ProfileRow icon={<LogOut color="var(--primary-red)" />} label="Log Out" color="var(--primary-red)" onClick={logout} />
        </div>
      </div>
    </div>
  );
}

function ProfileRow({ icon, label, color, onClick }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'var(--bg-light)', borderRadius: '15px', cursor: 'pointer', color: color || 'var(--text-light)' }} onClick={onClick || (() => alert(`${label} clicked`))}>
      {icon}
      <span style={{ fontWeight: 'bold' }}>{label}</span>
    </div>
  );
}
