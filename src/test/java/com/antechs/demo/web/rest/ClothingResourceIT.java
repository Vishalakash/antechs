package com.antechs.demo.web.rest;

import com.antechs.demo.ECommApp;
import com.antechs.demo.domain.Clothing;
import com.antechs.demo.repository.ClothingRepository;

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
 * Integration tests for the {@link ClothingResource} REST controller.
 */
@SpringBootTest(classes = ECommApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ClothingResourceIT {

    private static final byte[] DEFAULT_IMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMG = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMG_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_BARND = "AAAAAAAAAA";
    private static final String UPDATED_BARND = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    @Autowired
    private ClothingRepository clothingRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClothingMockMvc;

    private Clothing clothing;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clothing createEntity(EntityManager em) {
        Clothing clothing = new Clothing()
            .img(DEFAULT_IMG)
            .imgContentType(DEFAULT_IMG_CONTENT_TYPE)
            .barnd(DEFAULT_BARND)
            .type(DEFAULT_TYPE)
            .price(DEFAULT_PRICE);
        return clothing;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clothing createUpdatedEntity(EntityManager em) {
        Clothing clothing = new Clothing()
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE)
            .barnd(UPDATED_BARND)
            .type(UPDATED_TYPE)
            .price(UPDATED_PRICE);
        return clothing;
    }

    @BeforeEach
    public void initTest() {
        clothing = createEntity(em);
    }

    @Test
    @Transactional
    public void createClothing() throws Exception {
        int databaseSizeBeforeCreate = clothingRepository.findAll().size();
        // Create the Clothing
        restClothingMockMvc.perform(post("/api/clothing")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clothing)))
            .andExpect(status().isCreated());

        // Validate the Clothing in the database
        List<Clothing> clothingList = clothingRepository.findAll();
        assertThat(clothingList).hasSize(databaseSizeBeforeCreate + 1);
        Clothing testClothing = clothingList.get(clothingList.size() - 1);
        assertThat(testClothing.getImg()).isEqualTo(DEFAULT_IMG);
        assertThat(testClothing.getImgContentType()).isEqualTo(DEFAULT_IMG_CONTENT_TYPE);
        assertThat(testClothing.getBarnd()).isEqualTo(DEFAULT_BARND);
        assertThat(testClothing.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testClothing.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createClothingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clothingRepository.findAll().size();

        // Create the Clothing with an existing ID
        clothing.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClothingMockMvc.perform(post("/api/clothing")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clothing)))
            .andExpect(status().isBadRequest());

        // Validate the Clothing in the database
        List<Clothing> clothingList = clothingRepository.findAll();
        assertThat(clothingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllClothing() throws Exception {
        // Initialize the database
        clothingRepository.saveAndFlush(clothing);

        // Get all the clothingList
        restClothingMockMvc.perform(get("/api/clothing?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clothing.getId().intValue())))
            .andExpect(jsonPath("$.[*].imgContentType").value(hasItem(DEFAULT_IMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].img").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMG))))
            .andExpect(jsonPath("$.[*].barnd").value(hasItem(DEFAULT_BARND)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getClothing() throws Exception {
        // Initialize the database
        clothingRepository.saveAndFlush(clothing);

        // Get the clothing
        restClothingMockMvc.perform(get("/api/clothing/{id}", clothing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clothing.getId().intValue()))
            .andExpect(jsonPath("$.imgContentType").value(DEFAULT_IMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.img").value(Base64Utils.encodeToString(DEFAULT_IMG)))
            .andExpect(jsonPath("$.barnd").value(DEFAULT_BARND))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingClothing() throws Exception {
        // Get the clothing
        restClothingMockMvc.perform(get("/api/clothing/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClothing() throws Exception {
        // Initialize the database
        clothingRepository.saveAndFlush(clothing);

        int databaseSizeBeforeUpdate = clothingRepository.findAll().size();

        // Update the clothing
        Clothing updatedClothing = clothingRepository.findById(clothing.getId()).get();
        // Disconnect from session so that the updates on updatedClothing are not directly saved in db
        em.detach(updatedClothing);
        updatedClothing
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE)
            .barnd(UPDATED_BARND)
            .type(UPDATED_TYPE)
            .price(UPDATED_PRICE);

        restClothingMockMvc.perform(put("/api/clothing")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedClothing)))
            .andExpect(status().isOk());

        // Validate the Clothing in the database
        List<Clothing> clothingList = clothingRepository.findAll();
        assertThat(clothingList).hasSize(databaseSizeBeforeUpdate);
        Clothing testClothing = clothingList.get(clothingList.size() - 1);
        assertThat(testClothing.getImg()).isEqualTo(UPDATED_IMG);
        assertThat(testClothing.getImgContentType()).isEqualTo(UPDATED_IMG_CONTENT_TYPE);
        assertThat(testClothing.getBarnd()).isEqualTo(UPDATED_BARND);
        assertThat(testClothing.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testClothing.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingClothing() throws Exception {
        int databaseSizeBeforeUpdate = clothingRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClothingMockMvc.perform(put("/api/clothing")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clothing)))
            .andExpect(status().isBadRequest());

        // Validate the Clothing in the database
        List<Clothing> clothingList = clothingRepository.findAll();
        assertThat(clothingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClothing() throws Exception {
        // Initialize the database
        clothingRepository.saveAndFlush(clothing);

        int databaseSizeBeforeDelete = clothingRepository.findAll().size();

        // Delete the clothing
        restClothingMockMvc.perform(delete("/api/clothing/{id}", clothing.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Clothing> clothingList = clothingRepository.findAll();
        assertThat(clothingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
