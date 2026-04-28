import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmergency } from '../../context/EmergencyContext';
import { ShieldAlert, Navigation } from 'lucide-react';

export default function ResponderHome() {
  const { incidents, updateIncidentStatus } = useEmergency();
  const navigate = useNavigate();

  // Show active and responding incidents
  const activeIncidents = incidents.filter(i => i.status === 'ACTIVE' || i.status === 'RESPONDING');

  const handleUpdateStatus = (id, currentStatus) => {
    if (currentStatus === 'ACTIVE') {
      updateIncidentStatus(id, 'RESPONDING');
    } else if (currentStatus === 'RESPONDING') {
      updateIncidentStatus(id, 'RESOLVED');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginTop: 0, color: 'var(--text-dark)' }}>Active Dispatches</h3>
      
      {activeIncidents.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '50px' }}>No active dispatches.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {activeIncidents.map(inc => (
            <div key={inc.id} style={{ backgroundColor: 'white', border: '1px solid var(--border-light)', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldAlert color={inc.severity === 'Critical' || inc.severity === 'High Risk' ? 'var(--primary-red)' : '#ff9800'} size={24} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{inc.type} Incident</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{inc.id}</div>
                  </div>
                </div>
                <span style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '10px', backgroundColor: inc.status === 'ACTIVE' ? 'rgba(255,152,0,0.2)' : 'rgba(33,150,243,0.2)', color: inc.status === 'ACTIVE' ? '#ff9800' : '#2196f3', fontWeight: 'bold' }}>
                  {inc.status}
                </span>
              </div>
              
              <p style={{ fontSize: '14px', margin: '15px 0' }}><strong>Loc:</strong> {inc.location}</p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button 
                  onClick={() => navigate('/map')}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #2196f3', backgroundColor: 'white', color: '#2196f3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  <Navigation size={18} /> Route
                </button>
                <button 
                  onClick={() => handleUpdateStatus(inc.id, inc.status)}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: inc.status === 'ACTIVE' ? '#2196f3' : 'var(--success)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {inc.status === 'ACTIVE' ? 'Accept Dispatch' : 'Mark Resolved'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
