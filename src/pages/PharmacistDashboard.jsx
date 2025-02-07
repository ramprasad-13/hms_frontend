// PharmacistDashboard.jsx
import { useEffect, useState } from 'react';
import { getPatients } from '../utils/api'; // Import the getPatients function
import './PharmacistDashboard.css';

const PharmacistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patients data using the API function from api.js
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getPatients(token)
        .then((patientsData) => {
          const patientsWithFormattedDate = patientsData.map((patient) => ({
            ...patient,
            appointmentDate: new Date(patient.appointmentDate).toISOString().split('T')[0]
          }));
          setPatients(patientsWithFormattedDate);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching patients:', error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="pharmacist-dashboard-wrapper">
      <h2>Pharmacist Dashboard</h2>

      {loading ? <p>Loading...</p> : (
        <div className="patients-cards">
          {patients.map((patient) => (
            <div className="patient-card" key={patient._id}>
              <h3>{patient.fullName}</h3>
              <p>Age: {patient.age}</p>
              <p>Phone: {patient.phoneNumber}</p>
              <p>Gender: {patient.gender}</p>
              <p>Address: {patient.address}</p>
              <p>Appointment Date: {new Date(patient.appointmentDate).toLocaleDateString()}</p>
              <p>Medication Cause: {patient.medication.cause || 'N/A'}</p>
              <p>Prescription: {patient.medication.prescription || 'N/A'}</p>
              <p>Tests: {patient.medication.tests.join(', ') || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PharmacistDashboard;
