import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  return children; // If logged in, render the child components (i.e., the protected route)
};

export default ProtectedRoute;
