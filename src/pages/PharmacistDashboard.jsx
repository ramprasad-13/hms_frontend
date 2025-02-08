import { useEffect, useState } from 'react';
import { getPatients } from '../utils/api'; // Import the getPatients function
import './PharmacistDashboard.css';

const PharmacistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filters, setFilters] = useState({
    name: '',
    phoneNumber: '',
    startDate: '',
    endDate: ''
  });

  // Fetch patients data using the API function from api.js
  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const patientsData = await getPatients(token, filters); // Pass filters to the API
          const patientsWithFormattedDate = patientsData.map((patient) => ({
            ...patient,
            appointmentDate: new Date(patient.appointmentDate).toISOString().split('T')[0]
          }));
          setPatients(patientsWithFormattedDate);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching patients:', error);
          setLoading(false);
        }
      }
    };

    fetchPatients();
  }, [filters]); // Re-run when filters change

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="pharmacist-dashboard-wrapper">
      <h2>Pharmacist Dashboard</h2>

      <h4>Filter Patient</h4>
      {/* Query Filters Section */}
      <div className="patient-filters">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Search by name"
        />
        <input
          type="tel"
          name="phoneNumber"
          value={filters.phoneNumber}
          onChange={handleFilterChange}
          placeholder="Search by phone number"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          placeholder="Start date"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          placeholder="End date"
        />
      </div>

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
