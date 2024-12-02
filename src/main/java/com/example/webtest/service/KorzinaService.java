package com.example.webtest.service;

import com.example.webtest.dto.KorzinaDto;
import com.example.webtest.entity.Korzina;
import com.example.webtest.repository.KorzinaRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KorzinaService {

    private final KorzinaRepository korzinaRepository;
    private final UserSession userSession;

    public void addOrUpdateItem(Long bookId) {
//        Korzina korzina = korzinaRepository.findByBookId(bookId)
//                .orElse(new Korzina());
//        korzina.setBookId(bookId);
//        korzina.setQuantity(korzina.getQuantity() == null ? quantity : korzina.getQuantity() + quantity);
//        korzinaRepository.save(korzina);
        Korzina userKorzina = korzinaRepository.findKorzinaByUserIdAndBookId(userSession.getId(), bookId);
        if(userKorzina == null){
            Korzina korzina = new Korzina();
            korzina.setUserId(userSession.getId());
            korzina.setQuantity(1);
            korzina.setBookId(bookId);

            korzinaRepository.save(korzina);
        }else{
            userKorzina.setQuantity(userKorzina.getQuantity()+1);

            korzinaRepository.save(userKorzina);
        }
    }

    public void updateItemQuantity(Long itemId, Integer quantity) {
        Korzina korzina = korzinaRepository.findKorzinaByUserIdAndBookId(userSession.getId(), itemId);
        korzina.setQuantity(quantity);
        korzinaRepository.save(korzina);
    }

    public void removeItem(Long itemId) {
        try{
            Korzina korzina = korzinaRepository.findKorzinaByUserIdAndBookId(userSession.getId(), itemId);
            korzinaRepository.deleteById(korzina.getId());
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    public List<KorzinaDto> getItemsById() {

            List<KorzinaDto> korzinas = korzinaRepository.findKorzinaByuserId(userSession.getId());
            return korzinas;

    }

}
