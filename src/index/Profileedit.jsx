import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    phone: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`http://localhost:8082/users/edit/${id}`);
        if (response.status === 200) {
          setUser(response.data);
        } else {
          navigate("/FirstPage");
        }
      } catch (error) {
        console.log("Failed to fetch user", error);
        navigate("/fhh");
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8082/users/edit`, user);
      if (response.status === 200) {
        navigate("/FirstPage");
      } else {
        console.log("Failed to update user");
      }
    } catch (error) {
      console.log("Failed to update user", error);
    }
  };

  return (
    
    <div>
          <main className="form-signin w-100 m-auto" style={{ maxWidth: "300px" }}>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
         
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
          />
           <label htmlFor="name">Name:</label>
        </div>
        <div className="form-floating mb-3">
        
          <input
            type="text"
            className="form-control"
            name="lastname"
            id="lastname"
            value={user.lastname}
            onChange={handleChange}
          />
            <label htmlFor="lastname">Last Name:</label>
        </div>
        <div className="form-floating mb-3">
          
          <input
            type="text"
            className="form-control"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone:</label>
        </div>
        <div className="form-floating mb-3">  
          
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
        </div>
       
        <div className="form-floating mb-3"></div>
        <div>
          <button className="btn btn-primary w-100 py-2" type="submit">Update User</button>
        </div>
      </form>
      </main>
      <Footer />
    </div>
    
  );
};

export default ProfileEdit;
