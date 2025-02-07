// StaffPage.jsx
import { useEffect, useState } from 'react';
import { getStaff, registerStaff, updateStaff, deleteStaff } from '../utils/api'; // Import the functions from api.js
import './StaffPage.css';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null); // Track which staff member is being edited
  const [newStaff, setNewStaff] = useState({ fullName: '', email: '', role: '', phoneNumber: '', password: '' });
  const [editedPassword, setEditedPassword] = useState(''); // To track the password input separately

  // Fetch staff data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchStaff = async () => {
        try {
          const staffData = await getStaff(token); // Use the function from api.js
          setStaff(staffData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching staff:', error);
          setLoading(false);
        }
      };
      fetchStaff();
    }
  }, []);

  // Delete a staff member
  const handleDeleteStaff = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteStaff(token, id); // Use the function from api.js
      setStaff(staff.filter(s => s._id !== id));
    } catch (error) {
      console.error('Error deleting staff', error);
    }
  };

  // Handle form changes for new staff registration or editing
  const handleChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  // Handle staff registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const registeredStaff = await registerStaff(token, newStaff); // Use the function from api.js
      setStaff([...staff, registeredStaff]);
      setNewStaff({ fullName: '', email: '', role: '', phoneNumber: '', password: '' });
    } catch (error) {
      console.error('Error registering staff:', error);
    }
  };

  // Handle updating staff details
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedStaff = { ...newStaff };

    if (editedPassword) {
      updatedStaff.password = editedPassword;
    }

    try {
      const updated = await updateStaff(token, editMode, updatedStaff); // Use the function from api.js
      setStaff(staff.map((s) => (s._id === editMode ? { ...s, ...updated } : s)));
      setEditMode(null);
      setEditedPassword('');
      setNewStaff({ fullName: '', email: '', role: '', phoneNumber: '', password: '' }); // Clear form after update
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  // Handle editing staff details
  const handleEditClick = (staffMember) => {
    setEditMode(staffMember._id);
    setNewStaff({ fullName: staffMember.fullName, email: staffMember.email, role: staffMember.role, phoneNumber: staffMember.phoneNumber, password: '' });
    setEditedPassword(''); // Reset the password input when editing
  };

  return (
    <div className="staff-page-wrapper">
      {/* Staff Registration or Update Form */}
      <h2>{editMode ? 'Update Staff' : 'Register New Staff'}</h2>
      <form onSubmit={editMode ? handleUpdateSubmit : handleRegisterSubmit}>
        <input
          type="text"
          name="fullName"
          value={newStaff.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newStaff.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <select
          name="role"
          value={newStaff.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="receptionist">Receptionist</option>
          <option value="pharamacist">Pharmacist</option>
        </select>
        <input
          type="tel"
          name="phoneNumber"
          value={newStaff.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="password"
          name="password"
          value={newStaff.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">{editMode ? 'Update Staff' : 'Register'}</button>
      </form>

      {/* Display Staff Members */}
      {loading ? <p>Loading...</p> : (
        <div className="staff-cards">
          {staff.map((staffMember) => (
            <div className="staff-card" key={staffMember._id}>
              <div>
                <h3>{staffMember.fullName}</h3>
                <p>Email: {staffMember.email}</p>
                <p>Role: {staffMember.role}</p>
                <p>Phone Number: {staffMember.phoneNumber}</p>
                <button onClick={() => handleEditClick(staffMember)}>Edit</button>
                <button onClick={() => handleDeleteStaff(staffMember._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffPage;
