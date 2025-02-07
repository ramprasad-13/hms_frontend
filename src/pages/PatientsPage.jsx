// PatientsPage.jsx
import { useEffect, useState } from 'react';
import { getPatients, addPatient, updatePatient, deletePatient } from '../utils/api'; // Import API functions
import './PatientsPage.css';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    gender: 'male',
    age: '',
    address: '',
    appointmentDate: '',
    medicationCause: '',
    prescription: '',
    tests: ''  // This will be comma-separated string for tests
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editPatientId, setEditPatientId] = useState(null);

  // Fetch patients
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getPatients(token)
        .then((patients) => {
          const patientsWithFormattedDate = patients.map(patient => ({
            ...patient,
            appointmentDate: new Date(patient.appointmentDate).toISOString().split('T')[0] // Format to yyyy-MM-dd
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

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit (for creating or updating a patient)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Prepare the patient data
    const patientData = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      age: formData.age,
      address: formData.address,
      appointmentDate: formData.appointmentDate, // Format is yyyy-MM-dd
      medicationCause: formData.medicationCause || "", // Medication cause
      prescription: formData.prescription || "",     // Prescription
      tests: formData.tests || ""                    // Tests (comma separated)
    };

    try {
      if (isEditing) {
        // Update existing patient
        const updatedPatient = await updatePatient(token, editPatientId, patientData);
        setPatients(patients.map(patient => patient._id === editPatientId ? { ...patient, ...updatedPatient } : patient));
        setIsEditing(false);
        setEditPatientId(null);
      } else {
        // Add new patient
        const newPatient = await addPatient(token, patientData);
        setPatients([...patients, newPatient]);
      }

      // Reset the form
      setFormData({
        fullName: '',
        phoneNumber: '',
        gender: 'male',
        age: '',
        address: '',
        appointmentDate: '',
        medicationCause: '',
        prescription: '',
        tests: ''
      });
    } catch (error) {
      console.error('Error saving patient data:', error);
    }
  };

  // Handle deleting a patient
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deletePatient(token, id);
      setPatients(patients.filter(patient => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Handle editing a patient
  const handleEdit = (patient) => {
    setFormData({
      fullName: patient.fullName,
      phoneNumber: patient.phoneNumber,
      gender: patient.gender,
      age: patient.age,
      address: patient.address,
      appointmentDate: patient.appointmentDate, // Ensure the date is in yyyy-MM-dd format
      medicationCause: patient.medication.cause,
      prescription: patient.medication.prescription,
      tests: patient.medication.tests.join(', ') // Join tests array into a comma-separated string
    });
    setIsEditing(true);
    setEditPatientId(patient._id);
  };

  return (
    <div className="patients-page-wrapper">
      <h2>{isEditing ? 'Edit Patient' : 'Add New Patient'}</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange} // Ensure handleChange is used here
          placeholder="Full Name"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange} // Ensure handleChange is used here
          placeholder="Phone Number"
          required
        />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange} // Ensure handleChange is used here
          placeholder="Age"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange} // Ensure handleChange is used here
          placeholder="Address"
          required
        />
        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange} // Ensure handleChange is used here
          required
        />
        <input
          type="text"
          name="medicationCause"
          value={formData.medicationCause}
          onChange={handleChange} // Ensure handleChange is used here
          placeholder="Medication Cause"
        />
        <input
          type="text"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange} // Ensure handleChange is used here
          placeholder="Prescription"
        />
        <input
          type="text"
          name="tests"
          value={formData.tests}
          onChange={handleChange} // Ensure handleChange is used here
          placeholder="Tests (comma separated)"
        />
        <button type="submit">{isEditing ? 'Update Patient' : 'Add Patient'}</button>
      </form>

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
              <button onClick={() => handleEdit(patient)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(patient._id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
