import React, { useState, useEffect } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { GoogleMap, useJsApiLoader, Marker, Polygon, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '100%' };
const mapOptions = { disableDefaultUI: true, mapTypeId: 'roadmap' };

const fireIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#e53935" stroke="white" stroke-width="2"/></svg>');
const medicIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#2196f3" stroke="white" stroke-width="2"/></svg>');

export default function Overview() {
  const { incidents } = useEmergency();
  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "" });

  const [center, setCenter] = useState({ lat: 34.0522, lng: -118.2437 });
  const [dangerZone, setDangerZone] = useState([]);
  const [fireLoc, setFireLoc] = useState({ lat: 34.055, lng: -118.24 });
  const [medicLoc, setMedicLoc] = useState({ lat: 34.045, lng: -118.25 });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCenter({ lat, lng });
        
        setDangerZone([
          { lat: lat + 0.01, lng: lng - 0.01 }, { lat: lat + 0.01, lng: lng + 0.01 },
          { lat: lat - 0.01, lng: lng + 0.01 }, { lat: lat - 0.01, lng: lng - 0.01 }
        ]);
        setFireLoc({ lat: lat + 0.003, lng: lng + 0.004 });
        setMedicLoc({ lat: lat - 0.007, lng: lng - 0.006 });
      });
    }
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '20px', height: '400px', marginBottom: '20px' }}>
        <div style={{ flex: '1', borderRadius: '15px', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
          <div style={{ position: 'absolute', top: 15, left: 50, fontWeight: 'bold', color: 'var(--text-dark)', zIndex: 1000, fontSize: '12px', backgroundColor: 'rgba(255,255,255,0.8)', padding: '5px 10px', borderRadius: '5px' }}>LIVE INCIDENT MAP (GOOGLE)</div>
          
          {isLoaded ? (
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13} options={mapOptions}>
              {dangerZone.length > 0 && <Polygon paths={dangerZone} options={{ fillColor: '#e53935', fillOpacity: 0.2, strokeColor: '#e53935', strokeOpacity: 0.8, strokeWeight: 2 }} />}
              
              <Marker position={fireLoc} icon={{ url: fireIconUrl }} onClick={() => setSelected({ loc: fireLoc, info: 'Fire Incident - High Severity' })} />
              <Marker position={medicLoc} icon={{ url: medicIconUrl }} onClick={() => setSelected({ loc: medicLoc, info: 'Medical Emergency - Responding' })} />
              
              {selected && (
                <InfoWindow position={selected.loc} onCloseClick={() => setSelected(null)}>
                  <div style={{ color: '#000' }}>{selected.info}</div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0' }}>Loading Google Maps...</div>
          )}
        </div>

        {/* Right Panel */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: 'var(--bg-dark-panel)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border-dark)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', color: 'var(--text-light)' }}>INCIDENT SUMMARY (AI)</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              A major fire has been detected in Sector 4. Multiple people trapped in nearby rooms. 
              Smoke spreading towards Block B. Medical emergencies reported in Cafeteria.
            </p>
          </div>
          
          <div style={{ backgroundColor: 'var(--bg-dark-panel)', padding: '20px', borderRadius: '15px', border: '1px solid var(--border-dark)', flex: 1 }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '12px', color: 'var(--text-light)' }}>RECOMMENDED ACTIONS</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '2' }}>
              <li>Deploy Team Alpha to Block A</li>
              <li>Evacuate Block B</li>
              <li>Dispatch Medical Support to Cafeteria</li>
              <li>Ventilate area after rescue</li>
            </ul>
            <button style={{ width: '100%', marginTop: '20px', padding: '10px', backgroundColor: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
              BROADCAST INSTRUCTIONS
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Incident List */}
      <div style={{ flex: '1', backgroundColor: 'var(--bg-dark-panel)', borderRadius: '15px', padding: '20px', border: '1px solid var(--border-dark)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'var(--text-light)' }}>RECENT INCIDENTS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr 1fr', fontSize: '12px', color: 'var(--text-muted)', paddingBottom: '10px', borderBottom: '1px solid var(--border-dark)' }}>
            <div>ID</div><div>Type</div><div>Location</div><div>Severity</div><div>Reported At</div><div>Status</div><div>Action</div>
          </div>
          {incidents.map(inc => (
            <div key={inc.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr 1fr', fontSize: '12px', color: 'var(--text-light)', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-dark)' }}>
              <div>{inc.id}</div>
              <div>{inc.type}</div>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>{inc.location}</div>
              <div style={{ color: inc.severity === 'High' || inc.severity === 'Critical' ? 'var(--primary-red)' : 'var(--text-light)' }}>{inc.severity}</div>
              <div>{new Date(inc.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              <div style={{ color: inc.status === 'ACTIVE' ? '#ff9800' : inc.status === 'RESPONDING' ? 'var(--success)' : 'var(--text-muted)' }}>{inc.status}</div>
              <div style={{ color: 'var(--primary-red)', cursor: 'pointer', fontWeight: 'bold' }}>View</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
