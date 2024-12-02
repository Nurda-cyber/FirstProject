package com.example.webtest.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@SessionScope
@Data
@AllArgsConstructor
@NoArgsConstructor
@Service
public class UserSession {
    private Long id;
    private String name;
    private String lastname;
    private String phone;
    private String password;
    private String role;

}
