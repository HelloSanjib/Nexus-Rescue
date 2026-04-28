import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmergency } from '../../context/EmergencyContext';
import { Flame, ArrowLeft, Check } from 'lucide-react';

export default function ThreatDetected() {
  const navigate = useNavigate();
  const { activeUserIncident, updateIncidentStatus, setActiveUserIncident } = useEmergency();

  if (!activeUserIncident) return null;

  const handleResolve = async () => {
    try {
      await updateIncidentStatus(activeUserIncident.id, 'RESOLVED');
      setActiveUserIncident(null);
      navigate('/');
    } catch (e) {
      console.error("Failed to resolve incident", e);
    }
  };

  return (
    <div style={{ height: '100%', backgroundColor: 'var(--bg-white)', color: 'var(--text-light)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '50px 20px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--primary-red)', backgroundColor: 'var(--primary-red)', color: 'white' }}>
        <ArrowLeft size={24} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
        <h3 style={{ margin: '0 auto', fontSize: '16px' }}>THREAT DETECTED</h3>
        <Check size={24} onClick={handleResolve} style={{ cursor: 'pointer' }} />
      </div>

      <div style={{ flex: 1, padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Flame size={80} color="var(--primary-red)" fill="var(--primary-red)" style={{ marginBottom: '10px' }} />
        <h2 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>Fire Detected</h2>
        <span style={{ color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '18px', marginBottom: '40px' }}>High Risk</span>

        <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: 'auto' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Location</div>
            <div style={{ fontWeight: 'bold' }}>{activeUserIncident.location}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Time</div>
            <div style={{ fontWeight: 'bold' }}>10:24 AM, 28 May 2025</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Status</div>
            <div style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Alert sent to responders</div>
          </div>
        </div>

        <button onClick={() => navigate('/map')} style={{
          width: '100%', backgroundColor: 'var(--primary-red)', color: 'white', padding: '15px', borderRadius: '30px',
          fontWeight: 'bold', fontSize: '16px', marginBottom: '15px'
        }}>
          VIEW SAFETY MAP
        </button>
        <button style={{
          width: '100%', backgroundColor: 'var(--bg-white)', color: 'var(--text-light)', padding: '15px', borderRadius: '30px',
          border: '1px solid var(--border-dark)', fontWeight: 'bold', fontSize: '16px'
        }}>
          SHARE WITH OTHERS
        </button>
      </div>
    </div>
  );
}
