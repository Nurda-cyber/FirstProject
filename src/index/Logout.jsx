import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:8082/Logout');
      } catch (e) {
        console.log('Шығу сәтсіз', e);
      } finally {
        localStorage.clear();
        setTimeout(() => navigate('/Login'), 900);
      }
    };
    run();
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-main d-flex">
        <div className="auth-bg flex-fill">
          <div className="text-center">
            <div className="mb-3">
              <div className="brand-badge mx-auto">S</div>
            </div>
            <div className="logout-text mb-2">Жүйеден шығу…</div>
            <div className="auth-muted">Сізді жүйеден шығарып жатырмыз</div>
            <div className="mt-3"><div className="spinner-border" role="status" /></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Logout;
