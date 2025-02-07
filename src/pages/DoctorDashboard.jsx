import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    if (role === 'staff') {
      navigate('/staff');
    } else if (role === 'patients') {
      navigate('/patients');
    }
  };

  return (
    <div className="doctor-dashboard-container">
      <button onClick={() => handleNavigation('staff')} className="action-btn">Staff</button>
      <button onClick={() => handleNavigation('patients')} className="action-btn">Patients</button>
    </div>
  );
};

export default DoctorDashboard;
