import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

const EditBook = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [book, setBook] = useState({
    genre: '',
    name: '',
    number: ''
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`http://localhost:8082/books/edit/${id}`);
        if (response.status === 200) {
          setBook(response.data);
        } else {
          navigate("/FirstPage");
        }
      } catch (error) {
        console.log("Failed to fetch book", error);
        navigate("/Errorrr");
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8082/books/edit`, book);
      if (response.status === 200) {
        navigate("/FirstPage");
      } else {
        console.log("Failed to update book");
      }
    } catch (error) {
      console.log("Failed to update book", error);
    }
  };

  return (
    <div>
      <main className="form-signin w-100 m-auto" style={{ maxWidth: "300px" }}>
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
          
          <input
            type="text"
            className="form-control"
            name="genre"
            id="genre"
            value={book.genre}
            onChange={handleChange}
          />
          <label htmlFor="genre">Genre:</label>
        </div>
        <div className="form-floating mb-3">
          
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={book.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Name:</label>
        </div>
        <div className="form-floating mb-3">
        
          <input
            type="text"
            className="form-control"
            name="number"
            id="number"
            value={book.number}
            onChange={handleChange}
          />
            <label htmlFor="number">Number:</label>
        </div>
        <div>
          <button className="btn btn-primary w-100 py-2" type="submit">Update Book</button>
        </div>
      </form>
      </main>
      <Footer/>
    </div>
  );
};

export default EditBook;
