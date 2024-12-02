package com.example.webtest.controller;

import com.example.webtest.entity.Book;
import com.example.webtest.entity.User;
import com.example.webtest.service.BookService;
import com.example.webtest.service.KorzinaService;
import com.example.webtest.service.UserService;
import com.example.webtest.service.UserSession;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.amqp.RabbitRetryTemplateCustomizer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserSession userSession;
    private final BookService bookService;
    private final KorzinaService korzinaService;


    @GetMapping("/Registration")
    public String getBooks(Model model) {
        List<User> users = userService.getUsers();
        model.addAttribute("users", users);
        return "Registration";
    }

    @PostMapping("/Logout")
    public ResponseEntity<Void> logout() {
        userSession.setId(null);
        userSession.setName(null);
        userSession.setLastname(null);
        userSession.setPhone(null);
        userSession.setPassword(null);
        userSession.setRole(null);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getIndex() {

        Map<String, Object> response = new HashMap<>();

        if (userSession.getId() != null) {
            response.put("userid", userSession.getId());
            response.put("role", userSession.getRole());
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile() {
        Map<String, Object> response = new HashMap<>();
        response.put("username", userSession.getName());
        response.put("lastname", userSession.getLastname());
        response.put("id", userSession.getId());
        return ResponseEntity.ok(response);
    }
    @PostMapping("/users/add")
    public String addUserForm(@RequestBody User user) {
        userService.addUser(user.getName(), user.getLastname(), user.getPhone(), user.getPassword());
        return "redirect:/Login";
    }

    @PostMapping("/Login")
    public ResponseEntity<Map<String, Object>> checkUser(@RequestBody User user, Model model) {
        Map<String, Object> response = new HashMap<>();
        if(userService.checkUser(user, model)) {
            response.put("status", "true");
            response.put("userId", userSession.getId());
            response.put("role", userSession.getRole());


            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/users/edit/{id}")
    public ResponseEntity showEditForm(@PathVariable int id) {
        User user = userService.findUserById(id);
        if (user != null) {

            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(500).build();
        }
    }
    @PostMapping("/users/edit")
    public ResponseEntity processEditForm(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok(200);
    }
    @GetMapping("/users/all")
    public ResponseEntity<List<User>> usersAll(){
        List<User> users = userService.getUsers();
        return  ResponseEntity.ok(users);
    }
    @PostMapping("/users/remove/{id}")
    public String removeUser(@PathVariable Integer id){
        userService.removeUser(id);
        return "index";
    }

}
