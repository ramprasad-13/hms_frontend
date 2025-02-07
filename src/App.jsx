import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import PharmacistDashboard from './pages/PharmacistDashboard';
import Home from './pages/Home';
import PatientsPage from './pages/PatientsPage';
import StaffPage from './pages/StaffPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public route */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/doctor-dashboard"
              element={
                <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist-dashboard"
              element={
                <ProtectedRoute>
                  <ReceptionistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pharmacist-dashboard"
              element={
                <ProtectedRoute>
                  <PharmacistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute>
                  <StaffPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <PatientsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
