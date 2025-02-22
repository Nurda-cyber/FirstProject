import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import { useNavigate, NavLink } from 'react-router-dom'; 
import './Nurda.css';

const Registration = () => {
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    phone: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = 'Заполнить';
    if (!user.lastname) newErrors.lastname = 'Заполнить';
    if (!user.phone) {
      newErrors.phone = 'Заполнить';
    } else if (!/^\d{11}$/.test(user.phone)) {
      newErrors.phone = 'Номер телефона должен состоять из 11 цифр';
    }
    if (!user.password) {
      newErrors.password = 'Заполнить';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(user.password)) {
      newErrors.password = 'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8082/users/add', user);
      console.log(response);
      navigate('/Login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='full'>
      <div className="d-flex flex-column min-vh-100">
        <main className="form-signin w-100 m-auto" style={{ maxWidth: "350px", minHeight: "250px" }}>
          <form className="form1 border p-4 rounded" onSubmit={handleSubmit} style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", height: "100%" }}>
            <img className="mb-4" src="https://th.bing.com/th/id/OIP.xI7Ob-ZtwavPq0Atq9KEqgHaHa?rs=1&pid=ImgDetMain" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

            <div className="form-floating mb-3">
              <input 
                type="text" 
                className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                id="floatingInput" 
                name="name" 
                placeholder="Name" 
                value={user.name}
                onChange={handleInput} 
              />
              <label htmlFor="floatingInput">Name</label>
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="form-floating mb-3">
              <input 
                type="text" 
                className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} 
                id="floatingLastName" 
                name="lastname" 
                placeholder="LastName" 
                value={user.lastname} 
                onChange={handleInput} 
              />
              <label htmlFor="floatingLastName">LastName</label>
              {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
            </div>

            <div className="form-floating mb-3">
              <input 
                type="text" 
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`} 
                id="floatingPhone" 
                name="phone" 
                placeholder="Phone" 
                value={user.phone}
                onChange={handleInput} 
              />
              <label htmlFor="floatingPhone">Phone</label>
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="form-floating mb-3">
              <input 
                type="password" 
                className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                id="floatingPassword" 
                name="password" 
                placeholder="Password" 
                value={user.password} 
                onChange={handleInput} 
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
            <div className="text-center mt-3">
              <NavLink to="/Login" className="btn btn-link" style={{ textDecoration: 'none' }}>Login</NavLink>
            </div>
            <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
          </form>
        </main>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};

export default Registration;
