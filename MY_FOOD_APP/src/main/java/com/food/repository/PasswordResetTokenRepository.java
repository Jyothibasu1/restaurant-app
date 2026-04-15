package com.food.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.food.entity.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}