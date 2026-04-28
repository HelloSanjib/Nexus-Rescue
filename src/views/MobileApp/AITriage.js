import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmergency } from '../../context/EmergencyContext';
import { Loader2, Check, ArrowLeft } from 'lucide-react';

export default function AITriage() {
  const navigate = useNavigate();
  const { reportEmergency } = useEmergency();
  const [step, setStep] = useState(0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const steps = [
    "Recording Audio...",
    "Capturing Image...",
    "Detecting Location...",
    "Assessing Severity..."
  ];

  useEffect(() => {
    // Request actual camera and mic permissions
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error("Media access denied:", err));

    return () => {
      // Stop the camera/mic when navigating away
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (step < steps.length) {
      interval = setInterval(() => {
        setStep(prev => prev + 1);
      }, 1500);
    } else if (step === steps.length) {
      // Make sure we wait for the incident to be created in Firestore
      // before we navigate, otherwise the /threat screen is blank!
      const finishTriage = async () => {
        try {
          await reportEmergency({
            type: 'Fire',
            severity: 'High Risk',
            location: 'Block A, Floor 2, Room 205',
            description: 'Automated distress signal.'
          });
          navigate('/threat');
        } catch (e) {
          console.error("Failed to create incident:", e);
        }
      };
      finishTriage();
    }

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, navigate]); // Intentionally omitting reportEmergency

  return (
    <div style={{ height: '100%', backgroundColor: 'var(--bg-white)', color: 'var(--text-light)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '50px 20px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
        <ArrowLeft size={24} color="var(--text-light)" onClick={() => navigate(-1)} />
        <h3 style={{ margin: '0 auto', fontSize: '16px' }}>AI TRIAGE</h3>
        <div style={{ width: 24 }} />
      </div>
      
      <div style={{ flex: 1, padding: '40px 30px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <div style={{
            width: '180px', height: '180px', borderRadius: '50%', border: '4px solid var(--primary-red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: 'white',
            boxShadow: '0 0 20px rgba(229, 57, 53, 0.3)', animation: 'pulse 1.5s infinite', overflow: 'hidden', position: 'relative'
          }}>
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', opacity: 0.6 }} 
            />
            <span style={{ fontWeight: 'bold', zIndex: 1, textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              Analyzing<br/>Situation...
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', flex: 1 }}>
          {steps.map((text, idx) => (
            <div key={idx} style={{ 
              display: 'flex', alignItems: 'center', gap: '15px',
              opacity: step >= idx ? 1 : 0.4
            }}>
              {step > idx ? 
                <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={20} strokeWidth={3} />
                </div> : 
                (step === idx ? <Loader2 className="spinner" size={20} color="var(--primary-red)" /> : <div style={{width: 20, height: 20}}/>)
              }
              <span style={{ fontSize: '16px', fontWeight: step >= idx ? 'bold' : 'normal' }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', marginTop: 'auto', marginBottom: '20px' }}>
          Powered by Gemini AI <span style={{ color: '#4285F4', fontWeight: 'bold' }}>+</span>
        </div>
      </div>

      <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(229, 57, 53, 0); } 100% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0); } }
      `}</style>
    </div>
  );
}
