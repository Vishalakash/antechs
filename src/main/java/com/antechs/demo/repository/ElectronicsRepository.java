package com.antechs.demo.repository;

import com.antechs.demo.domain.Electronics;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Electronics entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ElectronicsRepository extends JpaRepository<Electronics, Long> {
}
