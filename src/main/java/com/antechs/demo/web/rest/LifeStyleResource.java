package com.antechs.demo.web.rest;

import com.antechs.demo.domain.LifeStyle;
import com.antechs.demo.repository.LifeStyleRepository;
import com.antechs.demo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.antechs.demo.domain.LifeStyle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LifeStyleResource {
	
	 private final Logger log = LoggerFactory.getLogger(LifeStyleResource.class);

	    private static final String ENTITY_NAME = "lifestyle";

	    @Value("${jhipster.clientApp.name}")
	    private String applicationName;

	    private final LifeStyleRepository lifestyleRepository;

	    public LifeStyleResource(LifeStyleRepository lifestyleRepository) {
	        this.lifestyleRepository = lifestyleRepository;
	    }

	    /**
	     * {@code POST  /lifestyle} : Create a new lifestyle.
	     *
	     * @param lifestyle the lifestyle to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lifestyle, or with status {@code 400 (Bad Request)} if the lifestyle has already an ID.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PostMapping("/lifestyle")
	    public ResponseEntity<LifeStyle> createLifeStyle(@RequestBody LifeStyle lifestyle) throws URISyntaxException {
	        log.debug("REST request to save Electronics : {}", lifestyle);
	        if (lifestyle.getId() != null) {
	            throw new BadRequestAlertException("A new lifestyle cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        LifeStyle result = lifestyleRepository.save(lifestyle);
	        return ResponseEntity.created(new URI("/api/lifestyle/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }

	    /**
	     * {@code PUT  /lifestyle} : Updates an existing lifestyle.
	     *
	     * @param lifestyle the lifestyle to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lifestyle,
	     * or with status {@code 400 (Bad Request)} if the lifestyle is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the lifestyle couldn't be updated.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PutMapping("/lifestyle")
	    public ResponseEntity<LifeStyle> updateLifeStyle(@RequestBody LifeStyle lifestyle) throws URISyntaxException {
	        log.debug("REST request to update LIfeStyle : {}", lifestyle);
	        if (lifestyle.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        LifeStyle result = lifestyleRepository.save(lifestyle);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lifestyle.getId().toString()))
	            .body(result);
	    }

	    /**
	     * {@code GET  /lifestyle} : get all the lifestyle.
	     *
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lifestyle in body.
	     */
	    @GetMapping("/lifestyle")
	    public List<LifeStyle> getAllLifeStyle() {
	        log.debug("REST request to get all LifeStyle");
	        return lifestyleRepository.findAll();
	    }

	    /**
	     * {@code GET  /lifestyle/:id} : get the "id" lifestyle.
	     *
	     * @param id the id of the lifestyle to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lifestyle, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping("/lifestyle/{id}")
	    public ResponseEntity<LifeStyle> getLifeStyle(@PathVariable Long id) {
	        log.debug("REST request to get LifeStyle : {}", id);
	        Optional<LifeStyle> lifestyle = lifestyleRepository.findById(id);
	        return ResponseUtil.wrapOrNotFound(lifestyle);
	    }

	    /**
	     * {@code DELETE  /lifestyle/:id} : delete the "id" lifestyle.
	     *
	     * @param id the id of the lifestyle to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping("/lifestyle/{id}")
	    public ResponseEntity<Void> deleteLifeStyle(@PathVariable Long id) {
	        log.debug("REST request to delete LifeStyle: {}", id);
	        lifestyleRepository.deleteById(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
	    }

}
