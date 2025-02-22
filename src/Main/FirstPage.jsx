import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../index/Footer';
import axios from 'axios';
import '../index/Nurda.css'; 

const FirstPage = () => {
  const [books, setBooks] = useState(null);
  const [alert, setAlert] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (!role || !userId) {
      navigate("/Login");
    }
  }, [navigate]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:8082/books/all');
        setBooks(response.data);
      } catch (error) {
        console.log("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

  const fetchBooks = async (url) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.log("Failed to fetch books", error);
    }
  };

  useEffect(() => {
    fetchBooks('http://localhost:8082/books/all');
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.post(`http://localhost:8082/books/remove/${id}`);
      setBooks(books.filter(book => book.id !== id));
      setAlert({ type: 'success', message: 'Book removed successfully!' }); 
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to remove book' }); 
      console.log("Failed to remove book", error);
    }
  };

  const handleBuy = async (id) => {
    try {
      await axios.post(`http://localhost:8082/books/remove/${id}`);
      setBooks(books.filter(book => book.id !== id));
      setAlert({ type: 'success', message: 'Book purchased successfully!' }); 
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to purchase book' });
      console.log("Failed to purchase book", error);
    }
  };

  const handleKorzina = async (id) => {
    try {
      await axios.post(`http://localhost:8082/korzina/${id}`);
      setAlert({ type: 'success', message: 'Book added to cart successfully!' }); 
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to add book to cart' }); 
      console.log("Failed to add book to cart", error);
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

        <div className="d-flex justify-content-start mb-3">
          <button className="btn btn-primary me-2" onClick={() => fetchBooks('http://localhost:8082/books/all')}>Все</button>
          <button className="btn btn-primary me-2" onClick={() => fetchBooks('http://localhost:8082/books/s')}>Ertegi</button>
          <button className="btn btn-primary me-2" onClick={() => fetchBooks('http://localhost:8082/books/l')}>Adebyet</button>
          <button className="btn btn-primary" onClick={() => fetchBooks('http://localhost:8082/books/p')}>Jyr</button>
        </div>
      <div className='Add'>
        <div className="row">
          {books.map(book => (
            <div key={book.id} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img src={`../${book.img}`} alt={book.name} className="card-img-top" style={{ width: '100%', height: '225px', objectFit: 'cover' }}/>
                <div className="card-body">
                  <h5 className="card-title">{book.name}</h5>
                  <p className="card-text">{book.genre}</p>
                  <p className="card-text">{book.number}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    {role === 'Admin' ? (
                      <>
                        <NavLink to={`/books/edit/${book.id}`} className="btn btn-primary">Edit</NavLink>
                        <button className="btn btn-danger" onClick={() => handleRemove(book.id)}>Remove</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-primary" onClick={() => handleKorzina(book.id)}>Add to Cart</button>
                        <button className="btn btn-danger" onClick={() => handleBuy(book.id)}>Buy</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default FirstPage;
