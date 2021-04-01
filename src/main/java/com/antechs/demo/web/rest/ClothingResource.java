package com.antechs.demo.web.rest;

import com.antechs.demo.domain.Clothing;
import com.antechs.demo.repository.ClothingRepository;
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
 * REST controller for managing {@link com.antechs.demo.domain.Clothing}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClothingResource {

    private final Logger log = LoggerFactory.getLogger(ClothingResource.class);

    private static final String ENTITY_NAME = "clothing";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClothingRepository clothingRepository;

    public ClothingResource(ClothingRepository clothingRepository) {
        this.clothingRepository = clothingRepository;
    }

    /**
     * {@code POST  /clothing} : Create a new clothing.
     *
     * @param clothing the clothing to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clothing, or with status {@code 400 (Bad Request)} if the clothing has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clothing")
    public ResponseEntity<Clothing> createClothing(@RequestBody Clothing clothing) throws URISyntaxException {
        log.debug("REST request to save Clothing : {}", clothing);
        if (clothing.getId() != null) {
            throw new BadRequestAlertException("A new clothing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Clothing result = clothingRepository.save(clothing);
        return ResponseEntity.created(new URI("/api/clothing/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clothing} : Updates an existing clothing.
     *
     * @param clothing the clothing to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clothing,
     * or with status {@code 400 (Bad Request)} if the clothing is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clothing couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clothing")
    public ResponseEntity<Clothing> updateClothing(@RequestBody Clothing clothing) throws URISyntaxException {
        log.debug("REST request to update Clothing : {}", clothing);
        if (clothing.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Clothing result = clothingRepository.save(clothing);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, clothing.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /clothing} : get all the clothing.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clothing in body.
     */
    @GetMapping("/clothing")
    public List<Clothing> getAllClothing() {
        log.debug("REST request to get all Clothing");
        return clothingRepository.findAll();
    }

    /**
     * {@code GET  /clothing/:id} : get the "id" clothing.
     *
     * @param id the id of the clothing to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clothing, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clothing/{id}")
    public ResponseEntity<Clothing> getClothing(@PathVariable Long id) {
        log.debug("REST request to get Clothing : {}", id);
        Optional<Clothing> clothing = clothingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clothing);
    }

    /**
     * {@code DELETE  /clothing/:id} : delete the "id" clothing.
     *
     * @param id the id of the clothing to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clothing/{id}")
    public ResponseEntity<Void> deleteClothing(@PathVariable Long id) {
        log.debug("REST request to delete Clothing : {}", id);
        clothingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
