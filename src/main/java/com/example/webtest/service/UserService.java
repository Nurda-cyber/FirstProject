package com.example.webtest.service;

import com.example.webtest.entity.Book;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import com.example.webtest.entity.User;
import com.example.webtest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;

    private final UserSession userSession;

    public User findUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public void updateUser(User user) {
        userSession.setName(user.getName());
        userSession.setPhone(user.getPhone());
        userSession.setRole(user.getRole());
        userSession.setLastname(user.getLastname());
        userSession.setPassword(user.getPassword());
        userRepository.save(user);
    }
    public List<User> getUsers(){
        List<User> users = userRepository.findAll();
        return users;
    }
    public void removeUser(Integer id){
        userRepository.deleteById(id);
    }
    public List<User> addUser(String name, String lastName, String phone, String password){
        User newUser = new User();
        newUser.setName(name);
        newUser.setLastname(lastName);
        newUser.setPhone(phone);
        newUser.setRole("User");
        newUser.setPassword(password);

        userRepository.save(newUser);
        return getUsers();
    }

    public boolean checkUser(User user, Model model) {
        try {
            User newUser = userRepository.checkUser(user.getPhone(), user.getPassword());
            if (newUser != null) {
                userSession.setId(newUser.getId());
                userSession.setName(newUser.getName());
                userSession.setLastname(newUser.getLastname());
                userSession.setPhone(newUser.getPhone());
                userSession.setPassword(newUser.getPassword());
                userSession.setRole(newUser.getRole());
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}