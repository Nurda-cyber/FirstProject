import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { useNavigate, NavLink } from 'react-router-dom';

const Registration = () => {
  const [user, setUser] = useState({ name: '', lastname: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = 'Толтыру қажет';
    if (!user.lastname) newErrors.lastname = 'Толтыру қажет';
    if (!user.phone) newErrors.phone = 'Толтыру қажет';
    else if (!/^\d{11}$/.test(user.phone)) newErrors.phone = 'Телефон нөмірі 11 цифрдан тұруы керек';
    if (!user.password) newErrors.password = 'Толтыру қажет';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(user.password))
      newErrors.password = 'Кемінде 1 бас әріп, 1 кіші әріп және 1 сан болсын';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validateForm();
    if (Object.keys(v).length) { setErrors(v); return; }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8082/users/add', user);
      if (res.status === 200 || res.status === 201) navigate('/Login');
    } catch (err) {
      console.error('Қате:', err);
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
                <h1 className="h4 m-0 auth-title">Тіркелу</h1>
                <div className="auth-muted small">Жаңа аккаунт 1 минутта</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="form-label">Есім</label>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-person"></i></span>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Айдос"
                    value={user.name}
                    onChange={handleInput}
                  />
                </div>
                {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
              </div>

              <label className="form-label">Тегі</label>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                  <input
                    type="text"
                    name="lastname"
                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                    placeholder="Қасым"
                    value={user.lastname}
                    onChange={handleInput}
                  />
                </div>
                {errors.lastname && <div className="invalid-feedback d-block">{errors.lastname}</div>}
              </div>

              <label className="form-label">Телефон (11 цифр)</label>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-telephone"></i></span>
                  <input
                    type="text"
                    name="phone"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="87001234567"
                    value={user.phone}
                    onChange={handleInput}
                  />
                </div>
                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
              </div>

              <label className="form-label">Құпия сөз</label>
              <div className="mb-2">
                <div className="input-group">
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
                    <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="auth-muted">Тіркелу арқылы шарттармен келісесіз</small>
                <NavLink to="/Login" className="link-clean">Кіру</NavLink>
              </div>

              <button className="btn btn-accent w-100 py-2" type="submit" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                Тіркелу
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

export default Registration;
