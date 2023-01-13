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
@Table(name = "LIADMINMODULO")

public class Liadminmodulo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "AMIDMODULO")
    private Integer amidmodulo;
    @Column(name = "AMNOMBREMODULO")
    private String amnombremodulo;
    @Column(name = "AMHABILITADO")
    private Integer amhabilitado;
    @Column(name = "AMORDEN")
    private String amorden;
    @Column(name = "AMICONOCLS")
    private String amiconocls;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "armidadminmodulo", fetch = FetchType.LAZY)
    private Collection<Liadminrolmodulo> liadminrolmoduloCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "amaidmodulo", fetch = FetchType.LAZY)
    private Collection<Liadminmoduloacciones> liadminmoduloaccionesCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "amsidmodulo", fetch = FetchType.LAZY)
    private Collection<Liadminmoduloscript> liadminmoduloscriptCollection;

    public Liadminmodulo() {
    }

    public Liadminmodulo(Integer amidmodulo) {
        this.amidmodulo = amidmodulo;
    }

    public Integer getAmidmodulo() {
        return amidmodulo;
    }

    public void setAmidmodulo(Integer amidmodulo) {
        this.amidmodulo = amidmodulo;
    }

    public String getAmnombremodulo() {
        return amnombremodulo;
    }

    public void setAmnombremodulo(String amnombremodulo) {
        this.amnombremodulo = amnombremodulo;
    }

    public Integer getAmhabilitado() {
        return amhabilitado;
    }

    public void setAmhabilitado(Integer amhabilitado) {
        this.amhabilitado = amhabilitado;
    }

    public String getAmorden() {
        return amorden;
    }

    public void setAmorden(String amorden) {
        this.amorden = amorden;
    }

    public String getAmiconocls() {
        return amiconocls;
    }

    public void setAmiconocls(String amiconocls) {
        this.amiconocls = amiconocls;
    }

    public Collection<Liadminrolmodulo> getLiadminrolmoduloCollection() {
        return liadminrolmoduloCollection;
    }

    public void setLiadminrolmoduloCollection(Collection<Liadminrolmodulo> liadminrolmoduloCollection) {
        this.liadminrolmoduloCollection = liadminrolmoduloCollection;
    }

    public Collection<Liadminmoduloacciones> getLiadminmoduloaccionesCollection() {
        return liadminmoduloaccionesCollection;
    }

    public void setLiadminmoduloaccionesCollection(Collection<Liadminmoduloacciones> liadminmoduloaccionesCollection) {
        this.liadminmoduloaccionesCollection = liadminmoduloaccionesCollection;
    }

    public Collection<Liadminmoduloscript> getLiadminmoduloscriptCollection() {
        return liadminmoduloscriptCollection;
    }

    public void setLiadminmoduloscriptCollection(Collection<Liadminmoduloscript> liadminmoduloscriptCollection) {
        this.liadminmoduloscriptCollection = liadminmoduloscriptCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (amidmodulo != null ? amidmodulo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liadminmodulo)) {
            return false;
        }
        Liadminmodulo other = (Liadminmodulo) object;
        if ((this.amidmodulo == null && other.amidmodulo != null) || (this.amidmodulo != null && !this.amidmodulo.equals(other.amidmodulo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liadminmodulo[amidmodulo=" + amidmodulo + "]";
    }

}
