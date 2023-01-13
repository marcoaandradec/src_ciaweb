/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
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
 * @author marco
 */
@Entity
@Table(name = "LICTLCOMBO")

public class Lictlcombo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "CCIDCOMBO")
    private Integer ccidcombo;
    @Column(name = "CCNOMBRECOMBO")
    private String ccnombrecombo;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "coidcombo", fetch = FetchType.EAGER)
    private Collection<Licomboopciones> licomboopcionesCollection;

    public Lictlcombo() {
    }

    public Lictlcombo(Integer ccidcombo) {
        this.ccidcombo = ccidcombo;
    }

    public Integer getCcidcombo() {
        return ccidcombo;
    }

    public void setCcidcombo(Integer ccidcombo) {
        this.ccidcombo = ccidcombo;
    }

    public String getCcnombrecombo() {
        return ccnombrecombo;
    }

    public void setCcnombrecombo(String ccnombrecombo) {
        this.ccnombrecombo = ccnombrecombo;
    }

    public Collection<Licomboopciones> getLicomboopcionesCollection() {
        return licomboopcionesCollection;
    }

    public void setLicomboopcionesCollection(Collection<Licomboopciones> licomboopcionesCollection) {
        this.licomboopcionesCollection = licomboopcionesCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (ccidcombo != null ? ccidcombo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lictlcombo)) {
            return false;
        }
        Lictlcombo other = (Lictlcombo) object;
        if ((this.ccidcombo == null && other.ccidcombo != null) || (this.ccidcombo != null && !this.ccidcombo.equals(other.ccidcombo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Lictlcombo[ccidcombo=" + ccidcombo + "]";
    }

}
