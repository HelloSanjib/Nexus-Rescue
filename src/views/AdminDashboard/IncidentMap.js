import React, { useState, useEffect } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { GoogleMap, useJsApiLoader, Marker, Polygon, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '100%' };
const mapOptions = { disableDefaultUI: true, mapTypeId: 'hybrid' };

const fireIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#e53935" stroke="white" stroke-width="2"/></svg>');
const medicIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#2196f3" stroke="white" stroke-width="2"/></svg>');

export default function IncidentMap() {
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
    <div style={{ height: 'calc(100vh - 150px)', borderRadius: '15px', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
      <div style={{ position: 'absolute', top: 15, left: 50, fontWeight: 'bold', color: 'var(--text-dark)', zIndex: 1000, backgroundColor: 'rgba(255,255,255,0.8)', padding: '5px 10px', borderRadius: '5px' }}>GLOBAL DISPATCH MAP (GOOGLE)</div>
      
      {isLoaded ? (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13} options={mapOptions}>
          {dangerZone.length > 0 && <Polygon paths={dangerZone} options={{ fillColor: '#e53935', fillOpacity: 0.2, strokeColor: '#e53935', strokeOpacity: 0.8, strokeWeight: 2 }} />}
          
          {incidents.map(inc => {
            const pos = inc.type === 'Fire' ? fireLoc : inc.type === 'Medical' ? medicLoc : { lat: center.lat + 0.015, lng: center.lng - 0.01 };
            const iconUrl = inc.type === 'Fire' ? fireIconUrl : medicIconUrl;
            return (
              <Marker 
                key={inc.id} 
                position={pos} 
                icon={{ url: iconUrl }}
                onClick={() => setSelected({ loc: pos, info: `${inc.id} - ${inc.type}` })}
              />
            );
          })}

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
  );
}
