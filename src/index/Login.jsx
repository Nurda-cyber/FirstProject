import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!user.phone) newErrors.phone = 'Заполнить';
    if (!user.password) newErrors.password = 'Заполнить';
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
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:8082/Login', user);
      console.log(response);
      
      if (response.status === 200) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", response.data.role);
        console.log(localStorage);
        navigate('/FirstPage');
      } else {
        setError('Login failed: ' + response.data);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="form-signin w-100 m-auto" style={{ maxWidth: "350px" }}>
        <form className="form1 border p-4 rounded" onSubmit={handleSubmit} style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
          <img className="mb-4" src="https://th.bing.com/th/id/OIP.xI7Ob-ZtwavPq0Atq9KEqgHaHa?rs=1&pid=ImgDetMain" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          {error && <div className="alert alert-danger" role="alert">{error}</div>}

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

          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
          <div className="text-center mt-3">
            <NavLink to="/Registration" className="btn btn-link" style={{ textDecoration: 'none' }}>Registration</NavLink>
          </div>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
