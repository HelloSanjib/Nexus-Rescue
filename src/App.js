import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './views/MobileApp/MobileLayout';
import AdminLayout from './views/AdminDashboard/DashboardLayout';
import ResponderLayout from './views/ResponderApp/ResponderLayout';
import Login from './views/Auth/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EmergencyProvider } from './context/EmergencyContext';

function AppContent() {
  const { user } = useAuth();
  
  if (!user) {
    return <Login />;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Routes>
          {user.role === 'citizen' && <Route path="/*" element={<MobileLayout />} />}
          {user.role === 'responder' && <Route path="/*" element={<ResponderLayout />} />}
          {user.role === 'admin' && (
            <>
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <EmergencyProvider>
        <Router>
          <AppContent />
        </Router>
      </EmergencyProvider>
    </AuthProvider>
  );
}

export default App;
