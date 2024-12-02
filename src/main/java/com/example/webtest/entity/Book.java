package com.example.webtest.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Book")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Book {
    @Id
    @GeneratedValue
    @Column(name = "id",unique = true,nullable = false)
    private Integer id;
    private String name;
    private String genre;
    private Integer number;
    private String img;

}
