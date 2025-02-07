import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hms-backend-nu.vercel.app/api/auth/login', { email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('user', JSON.stringify(decodedToken));
        if (decodedToken.role === 'doctor') navigate('/doctor-dashboard');
        else if (decodedToken.role === 'receptionist') navigate('/receptionist-dashboard');
        else if (decodedToken.role === 'pharamacist') navigate('/pharmacist-dashboard');
      } else {
        setError('Failed to authenticate');
      }
    } catch (error) {
      setError('Invalid credentials or server error');
      console.error(error);
    }
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
