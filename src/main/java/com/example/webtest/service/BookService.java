package com.example.webtest.service;

import com.example.webtest.entity.Book;
import com.example.webtest.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public BookService(){

    }
    public Book findBookById(int id) {
        return bookRepository.findById(id).orElse(null);
    }
    public List<Book> findBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre);
    }



    public void updateBook(Book book) {
        bookRepository.save(book);
    }
    public List<Book> getBooks(){
        List<Book> books = bookRepository.findAll();
        return books;
    }

    public List<Book> addBook(String name,String genre,Integer number,String img){
        Book newBook = new Book();
        newBook.setGenre(genre);
        newBook.setName(name);
        newBook.setNumber(number);
        newBook.setImg(img);
        bookRepository.save(newBook);
        return getBooks();
    }

    public void deleteBook(Integer id) {
        bookRepository.deleteById(id);
    }
}
