import React, { useState } from 'react';
import Footer from '../components/Footer';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({ phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.phone) newErrors.phone = 'Толтыру қажет';
    if (!user.password) newErrors.password = 'Толтыру қажет';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const v = validateForm();
    if (Object.keys(v).length) { setErrors(v); return; }

    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const res = await axios.post('http://localhost:8082/Login', user);
      if (res.status === 200) {
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('role', res.data.role);
        navigate('/FirstPage');
      } else {
        setError('Кіру сәтсіз аяқталды');
      }
    } catch (err) {
      console.error(err);
      setError('Кіру кезінде қате пайда болды. Қайталап көріңіз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-main d-flex">
        <div className="auth-bg flex-fill">
          <main className="auth-card p-4 p-sm-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="brand-badge">S</div>
              <div>
                <h1 className="h4 m-0 auth-title">Қош келдіңіз!</h1>
                <div className="auth-muted small">Жүйеге кіріп, жалғастырайық</div>
              </div>
            </div>

            {error && (
              <div className={`alert alert-danger ${errors.phone || errors.password ? 'shake' : ''}`} role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label className="form-label">Телефон</label>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-telephone"></i></span>
                <input
                  type="text"
                  name="phone"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="87001234567"
                  value={user.phone}
                  onChange={handleInput}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              <label className="form-label">Құпия сөз</label>
              <div className="input-group mb-2">
                <span className="input-group-text"><i className="bi bi-shield-lock"></i></span>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  value={user.password}
                  onChange={handleInput}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  title={showPass ? 'Жасыру' : 'Көрсету'}
                >
                  <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="auth-muted">Құпия сөзді ұмыттыңыз ба?</small>
                <NavLink to="/Registration" className="link-clean">Тіркелу</NavLink>
              </div>

              <button className="btn btn-accent w-100 py-2" type="submit" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                Кіру
              </button>

              <p className="text-center mt-3 auth-muted mb-0">&copy; 2017–2024</p>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
