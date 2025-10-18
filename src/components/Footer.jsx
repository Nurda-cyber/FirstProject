import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <div className="container-fluid px-0">
    <footer role="contentinfo" className="site-footer d-flex flex-wrap align-items-center justify-content-between py-3 border-top">
      <p className="footer-muted mb-0 ps-3">&copy; {new Date().getFullYear()} Компания, Inc</p>

      <NavLink to="/" aria-label="Басты бет"
               className="footer-brand text-decoration-none d-flex align-items-center justify-content-center">
        <span className="footer-logo">S</span>
      </NavLink>

      <ul className="nav footer-nav pe-3">
        <li className="nav-item"><NavLink to="/FirstPage" end className="nav-link px-2 footer-link">Басты</NavLink></li>
        <li className="nav-item"><NavLink to="/features" className="nav-link px-2 footer-link">Мүмкіндіктер</NavLink></li>
        <li className="nav-item"><NavLink to="/pricing" className="nav-link px-2 footer-link">Бағалар</NavLink></li>
        <li className="nav-item"><NavLink to="/faq" className="nav-link px-2 footer-link">Сұрақ-жауап</NavLink></li>
        <li className="nav-item"><NavLink to="/about" className="nav-link px-2 footer-link">Біз туралы</NavLink></li>
      </ul>
    </footer>
  </div>
);

export default Footer;
