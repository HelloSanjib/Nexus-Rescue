import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore';

const EmergencyContext = createContext();

export const useEmergency = () => useContext(EmergencyContext);

export const EmergencyProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [activeUserIncident, setActiveUserIncident] = useState(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const q = query(collection(db, 'incidents'), orderBy('time', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedIncidents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setIncidents(fetchedIncidents);
      
      // Update activeUserIncident if it changed
      if (activeUserIncident) {
        const updatedActive = fetchedIncidents.find(i => i.id === activeUserIncident.id);
        if (updatedActive) setActiveUserIncident(updatedActive);
      }
    }, (error) => {
      console.error("Firestore sync error:", error);
    });

    return () => unsubscribe();
  }, [activeUserIncident]);

  const stats = {
    activeIncidents: incidents.filter(i => i.status === 'ACTIVE').length,
    peopleAtRisk: incidents.length * 5, 
    respondersDeployed: incidents.filter(i => i.status === 'RESPONDING').length * 3,
    areasCleared: incidents.filter(i => i.status === 'RESOLVED').length
  };

  const reportEmergency = async (details) => {
    try {
      const newIncidentData = {
        time: new Date().toISOString(),
        timestamp: new Date().toISOString(), // Required by firestore.rules
        status: 'ACTIVE',
        nodeId: 'USER-NODE',
        ...details
      };
      
      let newlyCreatedIncident;
      try {
        // Write to Firestore with a 1.5s timeout to prevent infinite hangs
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500));
        const docRef = await Promise.race([
          addDoc(collection(db, 'incidents'), newIncidentData),
          timeoutPromise
        ]);
        newlyCreatedIncident = { id: docRef.id, ...newIncidentData };
      } catch (dbError) {
        console.warn("Firestore write failed or timed out, falling back to local mock incident.", dbError);
        newlyCreatedIncident = { id: 'mock-id-' + Date.now(), ...newIncidentData };
        // Optionally add to local incidents list so it shows on the map during demo
        setIncidents(prev => [newlyCreatedIncident, ...prev]);
      }
      
      setActiveUserIncident(newlyCreatedIncident);
      return newlyCreatedIncident;
    } catch (error) {
      console.error("Failed to report emergency:", error);
      throw error;
    }
  };
  
  const updateIncidentStatus = async (id, newStatus) => {
    try {
      if (id.startsWith('mock-id-')) {
        // Update local mock state immediately
        setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: newStatus } : inc));
        return;
      }
      
      const incidentRef = doc(db, 'incidents', id);
      // Timeout to prevent hanging if Firebase is unresponsive
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500));
      await Promise.race([
        updateDoc(incidentRef, { status: newStatus }),
        timeoutPromise
      ]);
    } catch (error) {
      console.warn("Failed to update status in Firebase, ignoring for demo.", error);
      // Still update local state for the UI
      setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: newStatus } : inc));
    }
  };

  return (
    <EmergencyContext.Provider value={{
      incidents,
      stats,
      activeUserIncident,
      setActiveUserIncident,
      reportEmergency,
      updateIncidentStatus,
      isOfflineMode,
      setIsOfflineMode,
      isMenuOpen,
      setIsMenuOpen
    }}>
      {children}
    </EmergencyContext.Provider>
  );
};
