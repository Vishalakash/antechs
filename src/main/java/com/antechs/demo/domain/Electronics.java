package com.antechs.demo.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Electronics.
 */
@Entity
@Table(name = "electronics")
public class Electronics implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @Column(name = "modelname")
    private String modelname;

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

    public Electronics img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Electronics imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public String getModelname() {
        return modelname;
    }

    public Electronics modelname(String modelname) {
        this.modelname = modelname;
        return this;
    }

    public void setModelname(String modelname) {
        this.modelname = modelname;
    }

    public String getType() {
        return type;
    }

    public Electronics type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getPrice() {
        return price;
    }

    public Electronics price(Long price) {
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
        return id != null && id.equals(((Electronics) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Electronics{" +
            "id=" + getId() +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + getImgContentType() + "'" +
            ", modelname='" + getModelname() + "'" +
            ", type='" + getType() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
