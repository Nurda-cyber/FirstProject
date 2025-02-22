import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../index/Footer';
import axios from 'axios';
import '../index/Nurda.css'; 

const Korzina = () => {
  const [books, setBooks] = useState(null);
  const [alert, setAlert] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:8082/korzina/all');
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Failed to fetch books", error);
      }
    };
    fetchBooks();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.post(`http://localhost:8082/removeKorzina/${id}`);
      setBooks(books.filter(book => book.bookId !== id));
      setAlert({ type: 'success', message: 'Book removed from cart successfully!' }); 
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to remove book from cart' }); 
      console.log("Failed to remove book", error);
    }
  };

  const closeAlert = () => {
    setAlert(null);
  };

  if (books == null) {
    return <>Loading...</>;
  }

  return (
    <div>
      {alert && (
        <div className={`alert ${alert.type}`}>
          <span className="bell-icon" onClick={closeAlert}>&#128276;</span>
          {alert.message}
          <span className="close" onClick={closeAlert}>&times;</span>
        </div>
      )}
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Call BookStore</h1>
            <p className="lead text-body-secondary">Eger Suraktar Tuyndasa</p>
            <p>
              <NavLink to="Faq" className="btn btn-primary my-2">Faq</NavLink>
              <NavLink to="Call" className="btn btn-secondary my-2">Call</NavLink>
            </p>
          </div>
        </div>
        <div className="row">
          {books.map(book => (
            <div key={book.bookId} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img src={`../${book.img}`} alt={book.name} className="card-img-top" style={{ width: '100%', height: '225px', objectFit: 'cover' }}/>
                <div className="card-body">
                  <h5 className="card-title">{book.name}</h5>
                  <p className="card-text">{book.amount}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary" onClick={() => handleRemove(book.bookId)}>Buy</button>
                    <button className="btn btn-danger" onClick={() => handleRemove(book.bookId)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Korzina;
