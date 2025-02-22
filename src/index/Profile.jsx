import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Footer from './Footer';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8082/profile');
        setProfile(response.data);
      } catch (error) {
        console.log("Failed to fetch profile data", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <div style={{
          width: '500px',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '25px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
          transition: 'transform 0.3s',
        }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img src="https://th.bing.com/th/id/OIP.Ghae4OEdb4UmC3hkqpFvLAHaGd?rs=1&pid=ImgDetMain" alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px' }} />
          <h1>{profile.username}</h1>
          <h1>{profile.lastname}</h1>
          <NavLink to={`/profile/edit/${profile.id}`} style={{
            display: 'inline-block',
            padding: '10px 20px',
            marginTop: '20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            textDecoration: 'none',
            transition: 'background-color 0.3s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
          >
            Update Info
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
