package com.antechs.demo.repository;

import com.antechs.demo.domain.LifeStyle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LifeStyle entity.
 */

@SuppressWarnings("unused")
@Repository
public interface LifeStyleRepository extends JpaRepository<LifeStyle, Long> {

}
