    package com.example.webtest.controller;

    import com.example.webtest.entity.Book;
    import com.example.webtest.entity.Korzina;
    import com.example.webtest.repository.BookRepository;
    import com.example.webtest.service.BookService;
    import com.example.webtest.service.KorzinaService;
    import com.example.webtest.service.UserSession;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Controller;
    import org.springframework.stereotype.Repository;
    import org.springframework.ui.Model;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @CrossOrigin(origins = "http://localhost:3000")
    @RequiredArgsConstructor
    public class BookController {

        private final BookService bookService;

        private final UserSession userSession;

        @GetMapping("/BooksAdmyn")
        public String getBookss(Model model) {
            if(userSession.getId()!=null){
                model.addAttribute("userid",userSession.getId());
            }
            return "books";
        }

        @PostMapping("/books/add")
        public String addBookForm(@RequestBody Book book) {
            bookService.addBook(book.getName(), book.getGenre(), book.getNumber(), book.getImg());
            return "redirect:/index";
        }
        @GetMapping("/books/all")
        public ResponseEntity<List<Book>> getAllBooks() {
            List<Book> books = bookService.getBooks();
            return ResponseEntity.ok(books);
        }
        @GetMapping("/books/s")
        public ResponseEntity<List<Book>> getSBooks() {
            List<Book> books = bookService.findBooksByGenre("ertegi");
            return ResponseEntity.ok(books);
        }

        @GetMapping("/books/l")
        public ResponseEntity<List<Book>> getLBooks() {
            List<Book> books = bookService.findBooksByGenre("adebyet");
            return ResponseEntity.ok(books);
        }

        @GetMapping("/books/p")
        public ResponseEntity<List<Book>> getPBooks() {
            List<Book> books = bookService.findBooksByGenre("jyr");
            return ResponseEntity.ok(books);
        }



        @PostMapping("/example")
        public String example(@RequestParam("example") double example,Model model) {
            model.addAttribute("example",example);
            return "redirect:/index";
        }
        @GetMapping("/books/edit/{id}")
        public ResponseEntity showEditForm(@PathVariable int id) {
            Book book = bookService.findBookById(id);
            if (book != null) {

                return ResponseEntity.ok(book);
            } else {
                return ResponseEntity.status(500).build();
            }
        }

        @PostMapping("/books/edit")
        public ResponseEntity processEditForm(@RequestBody Book book) {
            bookService.updateBook(book);
            return ResponseEntity.ok(200);
        }
        @PostMapping("/books/remove/{id}")
        public String deleteBook(@PathVariable Integer id) {
            bookService.deleteBook(id);
            return "redirect:/index";
        }

    }
