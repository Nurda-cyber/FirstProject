import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./Nurdaulet.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (!role || !userId) {
      navigate("/Login");
    }
  }, [navigate]);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
            <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"/></svg>
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><NavLink className="nav-link px-2 link-secondary" to="/FirstPage">Home</NavLink></li>
          <li><NavLink className="nav-link px-2 link-secondary" to="/Profile">Profile</NavLink></li>
          {role === "Admin" ? (
             <>
             <li><NavLink className="nav-link px-2 link-secondary" to="/BooksAdd">BookAdd</NavLink></li>
             <li><NavLink className="nav-link px-2 link-secondary" to="/Users">Users</NavLink></li>
           </>
          ) : (
            <li><NavLink className="nav-link px-2 link-secondary" to="/Korzina">Korzina</NavLink></li>
          )}
        </ul>

        <div className="d-flex col-md-3 mb-2 mb-md-0 justify-content-end">
          {userId === null ? (
            <>
              <NavLink className="btn btn-outline-primary me-2" to="/Login">Login</NavLink>
              <NavLink className="btn btn-primary" to="/Registration">Sign-up</NavLink>
            </>
          ) : (
            <NavLink className="btn btn-outline-primary me-2" to="/Logout">Logout</NavLink>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
