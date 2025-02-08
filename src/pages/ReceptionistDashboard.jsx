import { useEffect, useState } from 'react';
import { getPatients, addPatient, updatePatient, deletePatient } from '../utils/api'; // Import the functions from api.js
import './ReceptionistDashboard.css';

const ReceptionistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    phoneNumber: '',
    gender: '',
    age: '',
    address: '',
    appointmentDate: ''
  });
  const [editingPatient, setEditingPatient] = useState(null);

  // Filter state
  const [filters, setFilters] = useState({
    name: '',
    phoneNumber: '',
    startDate: '',
    endDate: ''
  });

  // Helper function to get the token from localStorage
  const getAuthToken = () => localStorage.getItem('token');

  // Fetch all patients on component mount or when filters change
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.error('Token is missing!');
          return;
        }

        const patientsData = await getPatients(token, filters); // Use filters in the API call
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [filters]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  // Handle adding a new patient
  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('Token is missing!');
        return;
      }

      const addedPatient = await addPatient(token, newPatient); // Use the function from api.js
      setPatients([...patients, addedPatient]);
      setNewPatient({
        fullName: '',
        phoneNumber: '',
        gender: '',
        age: '',
        address: '',
        appointmentDate: ''
      });
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  // Handle editing patient
  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setNewPatient(patient); // Fill the form with the selected patient's data
  };

  // Handle updating patient details
  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('Token is missing!');
        return;
      }

      const updatedPatient = await updatePatient(token, editingPatient._id, newPatient); // Use the function from api.js
      const updatedPatients = patients.map((p) =>
        p._id === editingPatient._id ? updatedPatient : p
      );
      setPatients(updatedPatients);
      setEditingPatient(null);
      setNewPatient({
        fullName: '',
        phoneNumber: '',
        gender: '',
        age: '',
        address: '',
        appointmentDate: ''
      });
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  // Handle deleting patient
  const handleDeletePatient = async (id) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('Token is missing!');
        return;
      }

      await deletePatient(token, id); // Use the function from api.js
      setPatients(patients.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="receptionist-dashboard-wrapper">
      <h2>Receptionist Dashboard</h2>

      {/* Add or Edit Patient Form */}
      <form onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}>
        <input
          type="text"
          name="fullName"
          value={newPatient.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={newPatient.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />
        <select
          name="gender"
          value={newPatient.gender}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          name="age"
          value={newPatient.age}
          onChange={handleInputChange}
          placeholder="Age"
          required
        />
        <input
          type="text"
          name="address"
          value={newPatient.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <input
          type="date"
          name="appointmentDate"
          value={newPatient.appointmentDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingPatient ? 'Update Patient' : 'Add Patient'}</button>
      </form>

      {/* Query Filters Section */}
      <h4>Filter Patient</h4>
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

      {/* Patient Cards */}
      <div className="patients">
        {patients.map((patient) => (
          <div key={patient._id} className="patient-card">
            <h4>{patient.fullName}</h4>
            <p>Phone: {patient.phoneNumber}</p>
            <p>Gender: {patient.gender}</p>
            <p>Age: {patient.age}</p>
            <p>Address: {patient.address}</p>
            <p>Appointment Date: {new Date(patient.appointmentDate).toLocaleDateString()}</p>
            <button onClick={() => handleEditPatient(patient)}>Edit</button>
            <button onClick={() => handleDeletePatient(patient._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
