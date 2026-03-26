package com.legendss.backend.repositories;

import com.legendss.backend.entities.WheelChair;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WheelChairRepository extends JpaRepository<com.legendss.backend.entities.WheelChair, Long> {
    Optional<WheelChair> findByToken(String token);
}