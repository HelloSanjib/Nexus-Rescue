import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { Menu, SlidersHorizontal } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { GoogleMap, useJsApiLoader, Marker, Polygon, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '100%' };
const mapOptions = { disableDefaultUI: true, mapTypeId: 'roadmap' };

const fireIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#e53935" stroke="white" stroke-width="2"/></svg>');
const userIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#4caf50" stroke="white" stroke-width="2"/></svg>');

export default function SafetyMap() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { setIsMenuOpen } = useEmergency();
  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "" });

  const [userLoc, setUserLoc] = useState({ lat: 34.0522, lng: -118.2437 });
  const [dangerZone, setDangerZone] = useState([]);
  const [fireLoc, setFireLoc] = useState({ lat: 34.055, lng: -118.24 });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLoc({ lat, lng });
        
        setDangerZone([
          { lat: lat + 0.01, lng: lng - 0.01 }, { lat: lat + 0.01, lng: lng + 0.01 },
          { lat: lat - 0.01, lng: lng + 0.01 }, { lat: lat - 0.01, lng: lng - 0.01 }
        ]);
        setFireLoc({ lat: lat + 0.003, lng: lng + 0.004 });
      });
    }
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-white)' }}>
      {/* App Bar */}
      <div style={{ padding: '50px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-white)', zIndex: 1001 }}>
        <Menu size={24} color="var(--text-light)" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }} />
        <h3 style={{ margin: 0, color: 'var(--text-light)', fontSize: '16px', fontWeight: 'bold' }}>LIVE SAFETY MAP</h3>
        <SlidersHorizontal size={24} color="var(--text-light)" />
      </div>

      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {isLoaded ? (
          <GoogleMap mapContainerStyle={mapContainerStyle} center={userLoc} zoom={13} options={mapOptions}>
            {dangerZone.length > 0 && <Polygon paths={dangerZone} options={{ fillColor: '#e53935', fillOpacity: 0.2, strokeColor: '#e53935', strokeOpacity: 0.8, strokeWeight: 2 }} />}
            
            <Marker position={userLoc} icon={{ url: userIconUrl }} onClick={() => setSelected({ loc: userLoc, info: 'You are here' })} />
            <Marker position={fireLoc} icon={{ url: fireIconUrl }} onClick={() => setSelected({ loc: fireLoc, info: 'Active Fire' })} />
            
            {selected && (
              <InfoWindow position={selected.loc} onCloseClick={() => setSelected(null)}>
                <div style={{ color: '#000' }}>{selected.info}</div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: '40px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--light-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Menu size={40} color="var(--primary-red)" />
            </div>
            <h3 style={{ color: 'var(--text-light)', marginBottom: '10px' }}>Maps Unavailable</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
              Google Maps API key is missing or invalid. Please configure <code>REACT_APP_GOOGLE_MAPS_API_KEY</code> in your environment settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
