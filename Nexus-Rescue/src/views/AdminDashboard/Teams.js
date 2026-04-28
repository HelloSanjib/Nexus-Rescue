import React from 'react';
import { PhoneCall, MessageSquare, MapPin } from 'lucide-react';

export default function Teams() {
  const teams = [
    { id: 'Unit-04', type: 'Paramedic', status: 'On Route', assigned: 'INC-001', location: 'Sector 4', battery: '85%' },
    { id: 'Unit-07', type: 'Fire', status: 'On Scene', assigned: 'INC-002', location: 'Industrial Park', battery: '40%' },
    { id: 'Unit-12', type: 'Police', status: 'Available', assigned: 'None', location: 'Downtown', battery: '95%' }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Active Responders</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {teams.map(team => (
          <div key={team.id} style={{ backgroundColor: 'var(--bg-dark-panel)', borderRadius: '15px', padding: '25px', border: '1px solid var(--border-dark)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: 'var(--info)' }}>{team.id}</h3>
              <span style={{ 
                fontSize: '12px', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold',
                backgroundColor: team.status === 'Available' ? 'rgba(76,175,80,0.2)' : 'rgba(255,152,0,0.2)',
                color: team.status === 'Available' ? 'var(--success)' : 'var(--warning)'
              }}>
                {team.status}
              </span>
            </div>
            
            <p style={{ margin: '0 0 5px 0', color: 'white' }}><strong>Type:</strong> {team.type}</p>
            <p style={{ margin: '0 0 5px 0', color: 'white' }}><strong>Assignment:</strong> {team.assigned}</p>
            <p style={{ margin: '0 0 20px 0', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={14} /> {team.location}
            </p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ flex: 1, padding: '10px', backgroundColor: 'transparent', border: '1px solid var(--border-light)', color: 'white', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                <PhoneCall size={16} /> Call
              </button>
              <button style={{ flex: 1, padding: '10px', backgroundColor: 'var(--info)', border: 'none', color: 'white', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                <MessageSquare size={16} /> Msg
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
