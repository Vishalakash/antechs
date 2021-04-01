package com.antechs.demo.web.rest;

import com.antechs.demo.domain.Electronics;
import com.antechs.demo.repository.ElectronicsRepository;
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
 * REST controller for managing {@link com.antechs.demo.domain.Electronics}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ElectronicsResource {

    private final Logger log = LoggerFactory.getLogger(ElectronicsResource.class);

    private static final String ENTITY_NAME = "electronics";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ElectronicsRepository electronicsRepository;

    public ElectronicsResource(ElectronicsRepository electronicsRepository) {
        this.electronicsRepository = electronicsRepository;
    }

    /**
     * {@code POST  /electronics} : Create a new electronics.
     *
     * @param electronics the electronics to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new electronics, or with status {@code 400 (Bad Request)} if the electronics has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/electronics")
    public ResponseEntity<Electronics> createElectronics(@RequestBody Electronics electronics) throws URISyntaxException {
        log.debug("REST request to save Electronics : {}", electronics);
        if (electronics.getId() != null) {
            throw new BadRequestAlertException("A new electronics cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Electronics result = electronicsRepository.save(electronics);
        return ResponseEntity.created(new URI("/api/electronics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /electronics} : Updates an existing electronics.
     *
     * @param electronics the electronics to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated electronics,
     * or with status {@code 400 (Bad Request)} if the electronics is not valid,
     * or with status {@code 500 (Internal Server Error)} if the electronics couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/electronics")
    public ResponseEntity<Electronics> updateElectronics(@RequestBody Electronics electronics) throws URISyntaxException {
        log.debug("REST request to update Electronics : {}", electronics);
        if (electronics.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Electronics result = electronicsRepository.save(electronics);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, electronics.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /electronics} : get all the electronics.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of electronics in body.
     */
    @GetMapping("/electronics")
    public List<Electronics> getAllElectronics() {
        log.debug("REST request to get all Electronics");
        return electronicsRepository.findAll();
    }

    /**
     * {@code GET  /electronics/:id} : get the "id" electronics.
     *
     * @param id the id of the electronics to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the electronics, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/electronics/{id}")
    public ResponseEntity<Electronics> getElectronics(@PathVariable Long id) {
        log.debug("REST request to get Electronics : {}", id);
        Optional<Electronics> electronics = electronicsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(electronics);
    }

    /**
     * {@code DELETE  /electronics/:id} : delete the "id" electronics.
     *
     * @param id the id of the electronics to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/electronics/{id}")
    public ResponseEntity<Void> deleteElectronics(@PathVariable Long id) {
        log.debug("REST request to delete Electronics : {}", id);
        electronicsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
