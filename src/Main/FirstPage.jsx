import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import '../styles/firstpage.css'; // (алдыңғы бергенім)

const FirstPage = () => {
  const [books, setBooks] = useState(null);
  const [alert, setAlert] = useState(null);
  const role = localStorage.getItem('role');

  const fetchBooks = async (url = 'http://localhost:8082/books/all') => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(url);
      setBooks(data);
    } catch (e) { console.log('Failed to fetch books', e); }
  };

  useEffect(() => { fetchBooks(); }, []);

  const msg = (type, message) => setAlert({ type, message });
  const closeAlert = () => setAlert(null);

  const handleRemove = async (id) => {
    try {
      await axios.post(`http://localhost:8082/books/remove/${id}`);
      setBooks(b => b.filter(x => x.id !== id));
      msg('success','Кітап өшірілді!');
    } catch { msg('danger','Өшіру сәтсіз'); }
  };

  const handleBuy = async (id) => {
    try {
      await axios.post(`http://localhost:8082/books/remove/${id}`);
      setBooks(b => b.filter(x => x.id !== id));
      msg('success','Сатып алынды!');
    } catch { msg('danger','Сатып алу сәтсіз'); }
  };

  const handleKorzina = async (id) => {
    try {
      await axios.post(`http://localhost:8082/korzina/${id}`);
      msg('success','Себетке қосылды!');
    } catch { msg('danger','Себетке қосу сәтсіз'); }
  };

  if (books === null) return <div className="text-center py-5">Loading…</div>;

  return (
    <div className="auth-page">
      <div className="auth-main d-flex">
        <div className="auth-bg flex-fill">

          {alert && (
            <div className={`fp-alert ${alert.type === 'success' ? 'fp-success' : 'fp-danger'}`}>
              <span className="bell-icon" onClick={closeAlert}>&#128276;</span>
              {alert.message}
              <span className="close" onClick={closeAlert}>&times;</span>
            </div>
          )}

          <section className="firstpage-section text-center container">
            <div className="row py-lg-4">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Call BookStore</h1>
                <p className="lead">Егер сұрақтар болса</p>
                <p>
                  <NavLink to="Faq" className="btn filter-btn my-2">Faq</NavLink>
                  <NavLink to="Call" className="btn filter-btn my-2 ms-2">Call</NavLink>
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-start mb-3">
              <button className="btn filter-btn me-2" onClick={() => fetchBooks()}>Барлығы</button>
              <button className="btn filter-btn me-2" onClick={() => fetchBooks('http://localhost:8082/books/s')}>Ертегі</button>
              <button className="btn filter-btn me-2" onClick={() => fetchBooks('http://localhost:8082/books/l')}>Әдебиет</button>
              <button className="btn filter-btn" onClick={() => fetchBooks('http://localhost:8082/books/p')}>Жыр</button>
            </div>

            <div className="row">
              {books.map(book => (
                <div key={book.id} className="col-md-4">
                  <div className="card book-card mb-4 shadow-sm">
                    <img src={book.img} alt={book.name} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{book.name}</h5>
                      <p className="card-text text-muted">{book.genre}</p>
                      <p className="card-text">{book.number}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        {role === 'Admin' ? (
                          <>
                            <NavLink to={`/books/edit/${book.id}`} className="btn btn-primary">Өңдеу</NavLink>
                            <button className="btn btn-danger" onClick={() => handleRemove(book.id)}>Өшіру</button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-primary" onClick={() => handleKorzina(book.id)}>Себетке қосу</button>
                            <button className="btn btn-danger" onClick={() => handleBuy(book.id)}>Сатып алу</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FirstPage;
