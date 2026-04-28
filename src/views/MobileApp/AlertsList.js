import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Plus, Flame, Navigation, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export default function AlertsList() {
  const navigate = useNavigate();
  const { setIsMenuOpen } = useEmergency();
  const [activeTab, setActiveTab] = useState('All');

  const alerts = [
    { id: 1, type: 'Fire Detected', loc: 'Block A, Floor 2', time: '10:24 AM', icon: <Flame color="var(--primary-red)" fill="var(--primary-red)" />, color: 'var(--primary-red)' },
    { id: 2, type: 'Medical Emergency', loc: 'Cafeteria, Floor 1', time: '10:18 AM', icon: <Navigation color="#2196f3" fill="#2196f3" />, color: '#2196f3' },
    { id: 3, type: 'Structural Issue', loc: 'Block C, Floor 3', time: '10:15 AM', icon: <AlertTriangle color="#ff9800" fill="#ff9800" />, color: '#ff9800' },
    { id: 4, type: 'Update: Area Cleared', loc: 'Block B, Floor 2', time: '10:05 AM', icon: <CheckCircle color="var(--success)" fill="var(--success)" />, color: 'var(--success)' }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-light)' }}>
      <div style={{ padding: '50px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid var(--border-light)' }}>
        <Menu size={24} color="var(--text-light)" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }} />
        <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-light)' }}>ALERTS</h3>
        <Plus size={24} color="var(--primary-red)" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />
      </div>

      <div style={{ display: 'flex', backgroundColor: 'white', borderBottom: '1px solid var(--border-light)' }}>
        <div 
          onClick={() => setActiveTab('All')}
          style={{ flex: 1, padding: '15px', textAlign: 'center', cursor: 'pointer', borderBottom: activeTab === 'All' ? '2px solid var(--primary-red)' : 'none', color: activeTab === 'All' ? 'var(--primary-red)' : 'var(--text-muted)', fontWeight: activeTab === 'All' ? 'bold' : 'normal' }}
        >
          All Incidents
        </div>
        <div 
          onClick={() => setActiveTab('Updates')}
          style={{ flex: 1, padding: '15px', textAlign: 'center', cursor: 'pointer', borderBottom: activeTab === 'Updates' ? '2px solid var(--primary-red)' : 'none', color: activeTab === 'Updates' ? 'var(--primary-red)' : 'var(--text-muted)', fontWeight: activeTab === 'Updates' ? 'bold' : 'normal' }}
        >
          Updates
        </div>
      </div>
      
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
        {alerts.map(a => (
          <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'white', padding: '15px', borderRadius: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${a.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {a.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: a.color }}>{a.type}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{a.loc}</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{a.time}</div>
          </div>
        ))}
        {activeTab === 'Updates' && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No new updates.</p>}
      </div>
    </div>
  );
}
