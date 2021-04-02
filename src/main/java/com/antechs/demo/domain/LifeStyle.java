package com.antechs.demo.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A LifeStyle.
 */
@Entity
@Table(name="lifestyle")
public class LifeStyle implements Serializable  {
	
	 private static final long serialVersionUID = 1L;

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Lob
	    @Column(name = "img")
	    private byte[] img;

	    @Column(name = "img_content_type")
	    private String imgContentType;


	    @Column(name = "type")
	    private String type;

	    @Column(name = "price")
	    private Long price;

	    // jhipster-needle-entity-add-field - JHipster will add fields here

	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }

	    public byte[] getImg() {
	        return img;
	    }

	    public LifeStyle img(byte[] img) {
	        this.img = img;
	        return this;
	    }

	    public void setImg(byte[] img) {
	        this.img = img;
	    }

	    public String getImgContentType() {
	        return imgContentType;
	    }

	    public LifeStyle imgContentType(String imgContentType) {
	        this.imgContentType = imgContentType;
	        return this;
	    }

	    public void setImgContentType(String imgContentType) {
	        this.imgContentType = imgContentType;
	    }

	    public String getType() {
	        return type;
	    }

	    public LifeStyle type(String type) {
	        this.type = type;
	        return this;
	    }

	    public void setType(String type) {
	        this.type = type;
	    }

	    public Long getPrice() {
	        return price;
	    }

	    public LifeStyle price(Long price) {
	        this.price = price;
	        return this;
	    }

	    public void setPrice(Long price) {
	        this.price = price;
	    }
	    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

	    @Override
	    public boolean equals(Object o) {
	        if (this == o) {
	            return true;
	        }
	        if (!(o instanceof Electronics)) {
	            return false;
	        }
	        return id != null && id.equals(((LifeStyle) o).id);
	    }

	    @Override
	    public int hashCode() {
	        return 31;
	    }

	    // prettier-ignore
	    @Override
	    public String toString() {
	        return "LifeStyle{" +
	            "id=" + getId() +
	            ", img='" + getImg() + "'" +
	            ", imgContentType='" + getImgContentType() + "'" +
	            ", type='" + getType() + "'" +
	            ", price=" + getPrice() +
	            "}";
	    }
}
