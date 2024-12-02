package com.example.webtest.controller;

import com.example.webtest.dto.KorzinaDto;
import com.example.webtest.entity.Korzina;
import com.example.webtest.service.KorzinaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class KorzinaController {

    private final KorzinaService korzinaService;

    @GetMapping("/korzina/all")
    public ResponseEntity viewKorzina() {

            List<KorzinaDto> items = korzinaService.getItemsById();
            return  ResponseEntity.ok(items);
    }

    @PostMapping("/korzina/{id}")
    public ResponseEntity addKorzina(@PathVariable Long id) {
        try {
            korzinaService.addOrUpdateItem(id);
            return ResponseEntity.ok().body("Book added to cart successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add book to cart");
        }
    }

    @PostMapping("/updateKorzina")
    public String updateKorzina(@RequestParam Long itemId, @RequestParam Integer quantity) {
        korzinaService.updateItemQuantity(itemId, quantity);
        return "redirect:/index";
    }

    @PostMapping("/removeKorzina/{id}")
    public ResponseEntity<?> removeKorzina(@PathVariable Long id) {
        try {
            korzinaService.removeItem(id);
            return ResponseEntity.ok("Book removed from cart successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove book from cart");
        }
    }
}
