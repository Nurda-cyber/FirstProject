package com.example.webtest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KorzinaDto {
    private Long bookId;
    private String name;
    private String img;
    private int amount;
}
