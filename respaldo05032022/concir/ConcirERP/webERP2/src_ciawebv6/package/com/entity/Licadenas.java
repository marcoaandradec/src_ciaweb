/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Marco Andrade
 */
@Entity
@Table(name = "LICADENAS")
public class Licadenas implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "CADCLAVE")
    private Integer cadclave;
    @Basic(optional = false)
    @Column(name = "CADNOMBRE")
    private String cadnombre;
    @Column(name = "CADFACTORENT")
    private Integer cadfactorent;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clicadena", fetch = FetchType.LAZY)
    private Collection<Liclientes> liclientesCollection;

    public Licadenas() {
    }

    public Licadenas(Integer cadclave) {
        this.cadclave = cadclave;
    }

    public Licadenas(Integer cadclave, String cadnombre) {
        this.cadclave = cadclave;
        this.cadnombre = cadnombre;
    }

    public Integer getCadclave() {
        return cadclave;
    }

    public void setCadclave(Integer cadclave) {
        this.cadclave = cadclave;
    }

    public String getCadnombre() {
        return cadnombre;
    }

    public void setCadnombre(String cadnombre) {
        this.cadnombre = cadnombre;
    }

    public Integer getCadfactorent() {
        return cadfactorent;
    }

    public void setCadfactorent(Integer cadfactorent) {
        this.cadfactorent = cadfactorent;
    }

    public Collection<Liclientes> getLiclientesCollection() {
        return liclientesCollection;
    }

    public void setLiclientesCollection(Collection<Liclientes> liclientesCollection) {
        this.liclientesCollection = liclientesCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cadclave != null ? cadclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Licadenas)) {
            return false;
        }
        Licadenas other = (Licadenas) object;
        if ((this.cadclave == null && other.cadclave != null) || (this.cadclave != null && !this.cadclave.equals(other.cadclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Licadenas[cadclave=" + cadclave + "]";
    }

}
