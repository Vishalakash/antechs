package com.antechs.demo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.antechs.demo.web.rest.TestUtil;

public class ClothingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Clothing.class);
        Clothing clothing1 = new Clothing();
        clothing1.setId(1L);
        Clothing clothing2 = new Clothing();
        clothing2.setId(clothing1.getId());
        assertThat(clothing1).isEqualTo(clothing2);
        clothing2.setId(2L);
        assertThat(clothing1).isNotEqualTo(clothing2);
        clothing1.setId(null);
        assertThat(clothing1).isNotEqualTo(clothing2);
    }
}
