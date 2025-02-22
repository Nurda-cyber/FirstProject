import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post('http://localhost:8082/Logout');
      localStorage.clear();
      setTimeout(() => {
        navigate("/Login");
      }, 1000); 
    } catch (error) {
      console.log("Failed to logout", error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0'
    },
    message: {
      fontSize: '24px',
      color: '#333',
      background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'fadeIn 2s ease-in-out'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.message}>Logging out...</h2>
    </div>
  );
}

export default Logout;
