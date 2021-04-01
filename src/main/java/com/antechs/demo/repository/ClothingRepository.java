package com.antechs.demo.repository;

import com.antechs.demo.domain.Clothing;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Clothing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClothingRepository extends JpaRepository<Clothing, Long> {
}
