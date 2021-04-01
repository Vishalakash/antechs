package com.antechs.demo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.antechs.demo.web.rest.TestUtil;

public class ElectronicsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Electronics.class);
        Electronics electronics1 = new Electronics();
        electronics1.setId(1L);
        Electronics electronics2 = new Electronics();
        electronics2.setId(electronics1.getId());
        assertThat(electronics1).isEqualTo(electronics2);
        electronics2.setId(2L);
        assertThat(electronics1).isNotEqualTo(electronics2);
        electronics1.setId(null);
        assertThat(electronics1).isNotEqualTo(electronics2);
    }
}
