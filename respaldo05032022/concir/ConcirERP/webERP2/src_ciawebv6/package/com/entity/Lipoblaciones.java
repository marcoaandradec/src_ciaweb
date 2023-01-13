/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
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
 * @author Sistemas
 */
@Entity
@Table(name = "LIPOBLACIONES")
public class Lipoblaciones implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "POBCLAVE")
    private Integer pobclave;
    @Basic(optional = false)
    @Column(name = "POBNOMBRE")
    private String pobnombre;
    @Basic(optional = false)
    @Column(name = "POBESTADO")
    private Integer pobestado;
    @Basic(optional = false)
    @Column(name = "POBRUTA")
    private Integer pobruta;
    @OneToMany(mappedBy = "embpoblacion", fetch = FetchType.LAZY)
    private Collection<Liembarques> liembarquesCollection;

    public Lipoblaciones() {
    }

    public Lipoblaciones(Integer pobclave) {
        this.pobclave = pobclave;
    }

    public Lipoblaciones(Integer pobclave, String pobnombre, Integer pobestado, Integer pobruta) {
        this.pobclave = pobclave;
        this.pobnombre = pobnombre;
        this.pobestado = pobestado;
        this.pobruta = pobruta;
    }

    public Integer getPobclave() {
        return pobclave;
    }

    public void setPobclave(Integer pobclave) {
        this.pobclave = pobclave;
    }

    public String getPobnombre() {
        return pobnombre;
    }

    public void setPobnombre(String pobnombre) {
        this.pobnombre = pobnombre;
    }

    public Integer getPobestado() {
        return pobestado;
    }

    public void setPobestado(Integer pobestado) {
        this.pobestado = pobestado;
    }

    public Integer getPobruta() {
        return pobruta;
    }

    public void setPobruta(Integer pobruta) {
        this.pobruta = pobruta;
    }

    public Collection<Liembarques> getLiembarquesCollection() {
        return liembarquesCollection;
    }

    public void setLiembarquesCollection(Collection<Liembarques> liembarquesCollection) {
        this.liembarquesCollection = liembarquesCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pobclave != null ? pobclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lipoblaciones)) {
            return false;
        }
        Lipoblaciones other = (Lipoblaciones) object;
        if ((this.pobclave == null && other.pobclave != null) || (this.pobclave != null && !this.pobclave.equals(other.pobclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Lipoblaciones[pobclave=" + pobclave + "]";
    }

}
