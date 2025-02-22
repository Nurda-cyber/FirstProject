import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Books = () => {
  const [book, setBook] = useState({
    name: '',
    genre: '',
    number: '',
    img: ''
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleFileInput = (event) => {
    const fileName = event.target.files[0] ? event.target.files[0].name : '';
    setBook({ ...book, img: fileName });
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/books/add', book);
      console.log(response);
      setBook({
         name: '',
         genre: '',
         number: '',
         img: ''
      });
      navigate('/FirstPage'); 
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <main className="form-signin w-100 m-auto" style={{ maxWidth: "300px" }}>
        <form className="form1" onSubmit={handleSubmit}>
          <img className="mb-4" src="https://th.bing.com/th/id/OIP.xI7Ob-ZtwavPq0Atq9KEqgHaHa?rs=1&pid=ImgDetMain" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please add book</h1>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={book.name} onChange={handleInput} />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating mb-3">
            <select className="form-control" id="genre" name="genre" value={book.genre} onChange={handleInput}>
              <option value="">Select Genre</option>
              <option value="ertegi">ertegi</option>
              <option value="adebyet">adebyet</option>
              <option value="jyr">jyr</option>
            </select>
            <label htmlFor="genre">Genre</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="number" name="number" placeholder="Number" value={book.number} onChange={handleInput} />
            <label htmlFor="number">Number</label>
          </div>

          <div className="form-floating mb-3">
            <input type="file" className="form-control" id="img" name="img" placeholder="Image" onChange={handleFileInput} />
            <label htmlFor="img">Image</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">Add Book</button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Books;
