import axios from 'axios';

const baseURL = 'https://hms-backend-nu.vercel.app/api';

// Patient-related API calls
export const getPatients = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/patient`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.patients;
  } catch (error) {
    console.error('Error fetching patients:', error.response || error);
    throw new Error('Error fetching patients');
  }
};

export const addPatient = async (token, newPatient) => {
  try {
    const response = await axios.post(`${baseURL}/patient/create`, newPatient, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.patient;
  } catch (error) {
    console.error('Error adding patient:', error.response || error);
    throw new Error('Error adding patient');
  }
};

export const updatePatient = async (token, patientId, updatedPatient) => {
  try {
    const response = await axios.put(`${baseURL}/patient/update/${patientId}`, updatedPatient, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.patient;
  } catch (error) {
    console.error('Error updating patient:', error.response || error);
    throw new Error('Error updating patient');
  }
};

export const deletePatient = async (token, patientId) => {
  try {
    await axios.delete(`${baseURL}/patient/delete/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting patient:', error.response || error);
    throw new Error('Error deleting patient');
  }
};

// Staff-related API calls
export const getStaff = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/staff`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching staff data:', error.response || error);
    if (error.response) {
      console.error('Error Response:', error.response.data);
    }
    throw new Error('Error fetching staff');
  }
};

export const registerStaff = async (token, newStaff) => {
  try {
    const response = await axios.post(`${baseURL}/staff/create`, newStaff, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error registering staff:', error.response || error);
    throw new Error('Error registering staff');
  }
};

export const updateStaff = async (token, staffId, updatedStaff) => {
  try {
    const response = await axios.put(`${baseURL}/staff/update/${staffId}`, updatedStaff, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating staff:', error.response || error);
    throw new Error('Error updating staff');
  }
};

export const deleteStaff = async (token, staffId) => {
  try {
    await axios.delete(`${baseURL}/staff/delete/${staffId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting staff:', error.response || error);
    throw new Error('Error deleting staff');
  }
};
