import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wifi } from 'lucide-react';

export default function OfflineMode() {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-white)', color: 'var(--text-light)' }}>
      <div style={{ padding: '50px 20px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-light)', backgroundColor: '#ff9800', color: 'white' }}>
        <ArrowLeft size={24} onClick={() => navigate(-1)} />
        <h3 style={{ margin: '0 auto', fontSize: '16px' }}>MESH MODE</h3>
        <div style={{ width: 24 }} />
      </div>
      
      <div style={{ flex: 1, padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#ff9800' }}></div>
            <div style={{ width: '25px', height: '25px', borderRadius: '50%', border: '4px solid #ff9800', position: 'absolute', top: '150px', left: '160px' }}></div>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '4px solid #ff9800', position: 'absolute', top: '140px', left: '150px' }}></div>
            <Wifi size={64} color="#ff9800" strokeWidth={3} />
          </div>
          <h2 style={{ color: '#ff9800', fontSize: '18px', margin: '20px 0 5px 0' }}>No Internet Connection</h2>
          <h1 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>Mesh Mode Active</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '250px' }}>
            Your SOS signal is being sent via nearby devices.
          </p>
        </div>

        <div style={{ marginTop: 'auto', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Connected Devices: 6</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => navigate('/home')}
          style={{
            width: '100%', padding: '15px', borderRadius: '30px',
            backgroundColor: 'transparent', border: '2px solid var(--primary-red)',
            color: 'var(--primary-red)', fontSize: '16px', fontWeight: 'bold'
          }}
        >
          CANCEL SOS
        </button>
      </div>
    </div>
  );
}
