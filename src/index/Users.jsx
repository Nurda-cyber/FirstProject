import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Footer from './Footer';
import './Users.css'; 

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/users/all');
        setUsers(response.data);
      } catch (error) {
        console.log("Failed to fetch users data", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.post(`http://localhost:8082/users/remove/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.log("Failed to remove user", error);
    }
  };

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Users List</h1>
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name} {user.lastname}</h5>
                <p className="card-text">{user.phone}</p>
                <div className="d-flex justify-content-between align-items-center">
                  
                  <button className="btn btn-danger" onClick={() => handleRemove(user.id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Users;
