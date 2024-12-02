package com.example.webtest.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    private String lastname;
    private String name;
    private String phone;
    private String password;
    private String role;

    
}

