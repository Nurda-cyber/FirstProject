package com.example.webtest.repository;

import com.example.webtest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

        @Query("SELECT u FROM User u WHERE u.phone = :phoneNum AND u.password = :password")
        User checkUser(String phoneNum, String password);

}

