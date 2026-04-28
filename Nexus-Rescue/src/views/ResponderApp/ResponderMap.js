import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '100%' };
const mapOptions = { disableDefaultUI: true, mapTypeId: 'roadmap' };

const responderIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#2196f3" stroke="white" stroke-width="2"/></svg>');
const incidentIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#e53935" stroke="white" stroke-width="2"/></svg>');

export default function ResponderMap() {
  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "" });
  
  const [userLoc, setUserLoc] = useState({ lat: 34.0400, lng: -118.2600 });
  const [incidentLoc, setIncidentLoc] = useState({ lat: 34.055, lng: -118.24 });
  const [route, setRoute] = useState([]);
  const [selected, setSelected] = useState(null);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLoc({ lat, lng });
        
        const iLoc = { lat: lat + 0.005, lng: lng + 0.005 };
        setIncidentLoc(iLoc);
        
        setRoute([
          { lat, lng },
          { lat: lat + 0.002, lng: lng + 0.003 },
          iLoc
        ]);
      });
    }
  }, []);

  return (
    <div style={{ height: '100%', position: 'relative', zIndex: 1 }}>
      <div style={{ position: 'absolute', top: 15, left: 15, zIndex: 1000, backgroundColor: 'white', padding: '10px 15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>NAVIGATING TO SCENE</div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2196f3' }}>ETA: 4 mins</div>
      </div>

      {isLoaded ? (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={userLoc} zoom={14} options={mapOptions}>
          {route.length > 0 && <Polyline path={route} options={{ strokeColor: '#2196f3', strokeOpacity: 0.8, strokeWeight: 5 }} />}
          
          <Marker position={userLoc} icon={{ url: responderIconUrl }} onClick={() => setSelected({ loc: userLoc, info: 'Medic Unit Alpha' })} />
          <Marker position={incidentLoc} icon={{ url: incidentIconUrl }} onClick={() => setSelected({ loc: incidentLoc, info: 'Fire Incident' })} />
          
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
