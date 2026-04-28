import React from 'react';
import { Bell, Radio, ShieldAlert } from 'lucide-react';

export default function SystemAlerts() {
  const alerts = [
    { id: 1, type: 'Mesh', message: 'Node-X9 joined the mesh network.', time: '2 mins ago', icon: <Radio color="var(--success)" /> },
    { id: 2, type: 'System', message: 'Gemini AI API latency high (1.2s)', time: '15 mins ago', icon: <Bell color="var(--warning)" /> },
    { id: 3, type: 'Critical', message: 'Multiple SOS signals received from Sector 4.', time: '1 hour ago', icon: <ShieldAlert color="var(--primary-red)" /> }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-dark-panel)', borderRadius: '15px', padding: '30px', border: '1px solid var(--border-dark)' }}>
      <h2 style={{ margin: '0 0 30px 0' }}>System & Network Alerts</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {alerts.map(alert => (
          <div key={alert.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-dark)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {alert.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0', color: 'white' }}>{alert.type} Alert</h4>
              <p style={{ margin: '0 0 5px 0', color: 'var(--text-muted)' }}>{alert.message}</p>
              <span style={{ fontSize: '12px', color: 'var(--border-light)' }}>{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
