package com.example.webtest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Korzina")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Korzina {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;
    private Long bookId;
    private Integer quantity;
    private Long userId;
}
