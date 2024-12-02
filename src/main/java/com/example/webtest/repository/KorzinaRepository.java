package com.example.webtest.repository;

import com.example.webtest.dto.KorzinaDto;
import com.example.webtest.entity.Korzina;
import com.example.webtest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface KorzinaRepository extends JpaRepository<Korzina, Long> {
    Optional<Korzina> findByBookId(Long bookId);
    Korzina findKorzinaByUserIdAndBookId(Long userId, Long bookId);
    List<Korzina> findKorzinaByUserId(Long userId);
    @Query("SELECT new com.example.webtest.dto.KorzinaDto(k.bookId, b.name, b.img, k.quantity) FROM Korzina k INNER JOIN Book b ON k.userId = :userId AND k.bookId = b.id")
    List<KorzinaDto> findKorzinaByuserId(Long userId);
    @Query("DELETE FROM Korzina k WHERE k.bookId = :bookId AND k.userId = :userId")
    void deleteByBookIdAndUserId(Long bookId, Long userId);

}
