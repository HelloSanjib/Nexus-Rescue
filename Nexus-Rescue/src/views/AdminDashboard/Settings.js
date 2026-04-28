import React from 'react';

export default function Settings() {
  return (
    <div style={{ backgroundColor: 'var(--bg-dark-panel)', borderRadius: '15px', padding: '30px', border: '1px solid var(--border-dark)', maxWidth: '600px' }}>
      <h2 style={{ margin: '0 0 30px 0' }}>Dashboard Settings</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <SettingRow title="Dark Mode" description="Use dark theme across all dashboard views" checked={true} />
        <SettingRow title="Sound Notifications" description="Play alert sound for new SOS signals" checked={true} />
        <SettingRow title="AI Processing" description="Use Gemini API to parse incoming audio/text" checked={true} />
        <SettingRow title="Mesh Network Simulation" description="Enable P2P node testing features" checked={false} />
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: 'white' }}>Firebase Config Override (JSON)</label>
          <textarea 
            rows={5} 
            style={{ width: '100%', backgroundColor: 'var(--bg-dark)', color: 'var(--text-muted)', border: '1px solid var(--border-dark)', padding: '15px', borderRadius: '5px', fontFamily: 'monospace' }}
            defaultValue='{ "apiKey": "mock-api-key", "projectId": "nexus-rescue-mock" }'
          />
        </div>
        
        <button style={{ alignSelf: 'flex-start', padding: '10px 25px', backgroundColor: 'var(--primary-red)', color: 'white', borderRadius: '5px', border: 'none', fontWeight: 'bold' }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

function SettingRow({ title, description, checked }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 5px 0', color: 'white' }}>{title}</h4>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>{description}</p>
      </div>
      <div style={{ 
        width: '50px', height: '26px', borderRadius: '13px', 
        backgroundColor: checked ? 'var(--primary-red)' : 'var(--border-dark)', 
        position: 'relative', cursor: 'pointer' 
      }}>
        <div style={{ 
          width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
          position: 'absolute', top: '3px', left: checked ? '27px' : '3px', transition: 'left 0.2s'
        }} />
      </div>
    </div>
  );
}
