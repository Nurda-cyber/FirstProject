import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "../styles/Nurdaulet.css";
import "bootstrap/dist/css/bootstrap.min.css";


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
      {/* Glass header */}
      <header className="root-header d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
        {/* Лого/бренд */}
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
            aria-label="Басты бет"
            title="Басты бет"
          >
            <span className="brand-pill">S</span>
          </a>
        </div>

        {/* Навигация */}
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink className="nav-link px-2 link-secondary" to="/FirstPage" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link px-2 link-secondary" to="/Profile">
              Profile
            </NavLink>
          </li>

          {role === "Admin" ? (
            <>
              <li>
                <NavLink className="nav-link px-2 link-secondary" to="/BooksAdd">
                  BookAdd
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link px-2 link-secondary" to="/Users">
                  Users
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink className="nav-link px-2 link-secondary" to="/Korzina">
                Korzina
              </NavLink>
            </li>
          )}
        </ul>

        {/* Оң жақ батырмалар */}
        <div className="d-flex col-md-3 mb-2 mb-md-0 justify-content-end">
          {userId === null ? (
            <>
              <NavLink className="btn btn-outline-primary me-2 btn-pill" to="/Login">
                Login
              </NavLink>
              <NavLink className="btn btn-primary btn-pill" to="/Registration">
                Sign-up
              </NavLink>
            </>
          ) : (
            <NavLink className="btn btn-outline-primary me-2 btn-pill" to="/Logout">
              Logout
            </NavLink>
          )}
        </div>
      </header>

      {/* Контент */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
