package com.antechs.demo.web.rest;

import com.antechs.demo.ECommApp;
import com.antechs.demo.domain.Electronics;
import com.antechs.demo.repository.ElectronicsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ElectronicsResource} REST controller.
 */
@SpringBootTest(classes = ECommApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ElectronicsResourceIT {

    private static final byte[] DEFAULT_IMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMG = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMG_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_MODELNAME = "AAAAAAAAAA";
    private static final String UPDATED_MODELNAME = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    @Autowired
    private ElectronicsRepository electronicsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restElectronicsMockMvc;

    private Electronics electronics;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Electronics createEntity(EntityManager em) {
        Electronics electronics = new Electronics()
            .img(DEFAULT_IMG)
            .imgContentType(DEFAULT_IMG_CONTENT_TYPE)
            .modelname(DEFAULT_MODELNAME)
            .type(DEFAULT_TYPE)
            .price(DEFAULT_PRICE);
        return electronics;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Electronics createUpdatedEntity(EntityManager em) {
        Electronics electronics = new Electronics()
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE)
            .modelname(UPDATED_MODELNAME)
            .type(UPDATED_TYPE)
            .price(UPDATED_PRICE);
        return electronics;
    }

    @BeforeEach
    public void initTest() {
        electronics = createEntity(em);
    }

    @Test
    @Transactional
    public void createElectronics() throws Exception {
        int databaseSizeBeforeCreate = electronicsRepository.findAll().size();
        // Create the Electronics
        restElectronicsMockMvc.perform(post("/api/electronics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(electronics)))
            .andExpect(status().isCreated());

        // Validate the Electronics in the database
        List<Electronics> electronicsList = electronicsRepository.findAll();
        assertThat(electronicsList).hasSize(databaseSizeBeforeCreate + 1);
        Electronics testElectronics = electronicsList.get(electronicsList.size() - 1);
        assertThat(testElectronics.getImg()).isEqualTo(DEFAULT_IMG);
        assertThat(testElectronics.getImgContentType()).isEqualTo(DEFAULT_IMG_CONTENT_TYPE);
        assertThat(testElectronics.getModelname()).isEqualTo(DEFAULT_MODELNAME);
        assertThat(testElectronics.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testElectronics.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createElectronicsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = electronicsRepository.findAll().size();

        // Create the Electronics with an existing ID
        electronics.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restElectronicsMockMvc.perform(post("/api/electronics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(electronics)))
            .andExpect(status().isBadRequest());

        // Validate the Electronics in the database
        List<Electronics> electronicsList = electronicsRepository.findAll();
        assertThat(electronicsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllElectronics() throws Exception {
        // Initialize the database
        electronicsRepository.saveAndFlush(electronics);

        // Get all the electronicsList
        restElectronicsMockMvc.perform(get("/api/electronics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(electronics.getId().intValue())))
            .andExpect(jsonPath("$.[*].imgContentType").value(hasItem(DEFAULT_IMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].img").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMG))))
            .andExpect(jsonPath("$.[*].modelname").value(hasItem(DEFAULT_MODELNAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getElectronics() throws Exception {
        // Initialize the database
        electronicsRepository.saveAndFlush(electronics);

        // Get the electronics
        restElectronicsMockMvc.perform(get("/api/electronics/{id}", electronics.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(electronics.getId().intValue()))
            .andExpect(jsonPath("$.imgContentType").value(DEFAULT_IMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.img").value(Base64Utils.encodeToString(DEFAULT_IMG)))
            .andExpect(jsonPath("$.modelname").value(DEFAULT_MODELNAME))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingElectronics() throws Exception {
        // Get the electronics
        restElectronicsMockMvc.perform(get("/api/electronics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateElectronics() throws Exception {
        // Initialize the database
        electronicsRepository.saveAndFlush(electronics);

        int databaseSizeBeforeUpdate = electronicsRepository.findAll().size();

        // Update the electronics
        Electronics updatedElectronics = electronicsRepository.findById(electronics.getId()).get();
        // Disconnect from session so that the updates on updatedElectronics are not directly saved in db
        em.detach(updatedElectronics);
        updatedElectronics
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE)
            .modelname(UPDATED_MODELNAME)
            .type(UPDATED_TYPE)
            .price(UPDATED_PRICE);

        restElectronicsMockMvc.perform(put("/api/electronics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedElectronics)))
            .andExpect(status().isOk());

        // Validate the Electronics in the database
        List<Electronics> electronicsList = electronicsRepository.findAll();
        assertThat(electronicsList).hasSize(databaseSizeBeforeUpdate);
        Electronics testElectronics = electronicsList.get(electronicsList.size() - 1);
        assertThat(testElectronics.getImg()).isEqualTo(UPDATED_IMG);
        assertThat(testElectronics.getImgContentType()).isEqualTo(UPDATED_IMG_CONTENT_TYPE);
        assertThat(testElectronics.getModelname()).isEqualTo(UPDATED_MODELNAME);
        assertThat(testElectronics.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testElectronics.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingElectronics() throws Exception {
        int databaseSizeBeforeUpdate = electronicsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restElectronicsMockMvc.perform(put("/api/electronics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(electronics)))
            .andExpect(status().isBadRequest());

        // Validate the Electronics in the database
        List<Electronics> electronicsList = electronicsRepository.findAll();
        assertThat(electronicsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteElectronics() throws Exception {
        // Initialize the database
        electronicsRepository.saveAndFlush(electronics);

        int databaseSizeBeforeDelete = electronicsRepository.findAll().size();

        // Delete the electronics
        restElectronicsMockMvc.perform(delete("/api/electronics/{id}", electronics.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Electronics> electronicsList = electronicsRepository.findAll();
        assertThat(electronicsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
