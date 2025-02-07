import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Track the current location (URL)

  // Function to check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set the login status based on token presence
  };

  // Check auth status on mount and whenever the location (URL) changes
  useEffect(() => {
    checkAuthStatus(); // Check on initial mount
    // Recheck the auth status every time the location changes
  }, [location]);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Log out: remove token and user info
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false); // Update state to reflect logout
      navigate('/'); // Redirect to home page after logout
    } else {
      navigate('/login'); // Redirect to login page when logged out
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="left">
          <h1 className="navbar-logo" onClick={() => navigate('/')}>MyApp</h1>
        </div>
        <div className="right">
          <button 
            className="navbar-btn login-logout-btn"
            onClick={handleLoginLogout}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
