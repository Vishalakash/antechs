package com.antechs.demo.web.rest;

import com.antechs.demo.domain.Shoes;
import com.antechs.demo.repository.ShoesRepository;
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
 * REST controller for managing {@link com.antechs.demo.domain.Shoes}.
 */
@RestController
@RequestMapping("/api")
@Transactional

public class ShoesResource {

	 private final Logger log = LoggerFactory.getLogger(ShoesResource.class);

	    private static final String ENTITY_NAME = "shoes";

	    @Value("${jhipster.clientApp.name}")
	    private String applicationName;

	    private final ShoesRepository shoesRepository;

	    public ShoesResource(ShoesRepository shoesRepository) {
	        this.shoesRepository = shoesRepository;
	    }

	    /**
	     * {@code POST  /shoes} : Create a new shoes.
	     *
	     * @param shoes the shoes to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shoes, or with status {@code 400 (Bad Request)} if the shoes has already an ID.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PostMapping("/shoes")
	    public ResponseEntity<Shoes> createShoes(@RequestBody Shoes shoes) throws URISyntaxException {
	        log.debug("REST request to save Electronics : {}", shoes);
	        if (shoes.getId() != null) {
	            throw new BadRequestAlertException("A new shoes cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        Shoes result = shoesRepository.save(shoes);
	        return ResponseEntity.created(new URI("/api/shoes/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }

	    /**
	     * {@code PUT  /shoes} : Updates an existing shoes.
	     *
	     * @param shoes the shoes to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shoes,
	     * or with status {@code 400 (Bad Request)} if the shoes is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the shoes couldn't be updated.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PutMapping("/shoes")
	    public ResponseEntity<Shoes> updateShoes(@RequestBody Shoes shoes) throws URISyntaxException {
	        log.debug("REST request to update LIfeStyle : {}", shoes);
	        if (shoes.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        Shoes result = shoesRepository.save(shoes);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, shoes.getId().toString()))
	            .body(result);
	    }

	    /**
	     * {@code GET  /shoes} : get all the shoes.
	     *
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shoes in body.
	     */
	    @GetMapping("/shoes")
	    public List<Shoes> getAllShoes() {
	        log.debug("REST request to get all Shoes");
	        return shoesRepository.findAll();
	    }

	    /**
	     * {@code GET  /shoes/:id} : get the "id" shoes.
	     *
	     * @param id the id of the shoes to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shoes, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping("/shoes/{id}")
	    public ResponseEntity<Shoes> getShoes(@PathVariable Long id) {
	        log.debug("REST request to get Shoes : {}", id);
	        Optional<Shoes> shoes = shoesRepository.findById(id);
	        return ResponseUtil.wrapOrNotFound(shoes);
	    }

	    /**
	     * {@code DELETE  /shoes/:id} : delete the "id" shoes.
	     *
	     * @param id the id of the shoes to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping("/shoes/{id}")
	    public ResponseEntity<Void> deleteShoes(@PathVariable Long id) {
	        log.debug("REST request to delete Shoes: {}", id);
	        shoesRepository.deleteById(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
	    }

}
