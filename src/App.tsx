import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EmergencyResponse from './pages/EmergencyResponse';
import Documentation from './pages/Documentation';
import Translation from './pages/Translation';
import Tracking from './pages/Tracking';
import VoiceAssistance from './pages/VoiceAssistance';
import CaseManagement from './pages/CaseManagement';
import HospitalTracking from './pages/HospitalTracking';
import HospitalDashboard from './pages/HospitalDashboard';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emergency-response" element={<EmergencyResponse />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/translation" element={<Translation />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/voice-assistance" element={<VoiceAssistance />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
        <Route path="/hospital/case-management" element={<CaseManagement />} />
        <Route path="/hospital/tracking" element={<HospitalTracking />} />
      </Routes>
    </Layout>
  );
}

export default App;