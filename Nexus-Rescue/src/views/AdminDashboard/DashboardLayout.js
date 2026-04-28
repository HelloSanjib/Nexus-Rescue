import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Overview from './Overview';
import IncidentMap from './IncidentMap';
import Teams from './Teams';
import SystemAlerts from './SystemAlerts';
import Settings from './Settings';
import Reports from './Reports';
import { LayoutDashboard, Map, Bell, Users, FileText, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout() {
  const location = useLocation();
  const { stats } = useEmergency();
  const { logout } = useAuth();
  
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: 'var(--bg-dark)', color: 'white', fontFamily: 'var(--font-main)' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', backgroundColor: 'var(--bg-dark-panel)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="Logo" style={{ width: 30, height: 30, borderRadius: '5px' }} />
          <div style={{ color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '18px' }}>Nexus <span style={{ color: 'white' }}>Rescue</span></div>
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', padding: '0 20px 20px', letterSpacing: '1px' }}>COMMAND CENTER</div>
        
        <nav style={{ flex: 1, padding: '0 10px' }}>
          <NavItem to="/admin" icon={<LayoutDashboard />} label="Dashboard" active={location.pathname === '/admin'} />
          <NavItem to="/admin/map" icon={<Map />} label="Live Map" active={location.pathname === '/admin/map'} />
          <NavItem to="/admin/alerts" icon={<Bell />} label="Incidents" active={location.pathname === '/admin/alerts'} />
          <NavItem to="/admin/teams" icon={<Users />} label="Responders" active={location.pathname === '/admin/teams'} />
          <NavItem to="/admin/reports" icon={<FileText />} label="Reports" active={location.pathname === '/admin/reports'} />
          <NavItem to="/admin/settings" icon={<SettingsIcon />} label="Settings" active={location.pathname === '/admin/settings'} />
        </nav>
        
        <div style={{ padding: '20px' }}>
          <div onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 15px', cursor: 'pointer' }}>
            <LogOut size={18} color="var(--primary-red)" />
            <span style={{ fontSize: '14px', color: 'var(--primary-red)' }}>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-dark)' }}>
          <div style={{ display: 'flex', gap: '40px', paddingLeft: '20px' }}>
            <TopStat label="Active Incidents" value={stats.activeIncidents || 12} />
            <TopStat label="People at Risk" value={stats.peopleAtRisk || 78} />
            <TopStat label="Responders Deployed" value={stats.respondersDeployed || 24} />
            <TopStat label="Areas Cleared" value={stats.areasCleared || 5} />
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/map" element={<IncidentMap />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/alerts" element={<SystemAlerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, active }) {
  return (
    <Link to={to} style={{ 
      display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 15px', borderRadius: '8px',
      color: active ? 'white' : 'var(--text-muted)',
      backgroundColor: active ? 'rgba(255,255,255,0.05)' : 'transparent',
      textDecoration: 'none', transition: 'all 0.2s', marginBottom: '5px'
    }}>
      {React.cloneElement(icon, { size: 18, color: active ? 'var(--primary-red)' : (icon.props.color || 'var(--text-muted)') })}
      <span style={{ fontSize: '14px' }}>{label}</span>
    </Link>
  );
}

function TopStat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '5px' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}
