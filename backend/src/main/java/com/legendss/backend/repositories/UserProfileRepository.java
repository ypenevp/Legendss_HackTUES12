package com.legendss.backend.repositories;

import com.legendss.backend.entities.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<com.legendss.backend.entities.UserProfile, Long> {
    Optional<UserProfile> findByUserId(Long id);
}