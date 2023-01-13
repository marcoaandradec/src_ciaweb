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
@Table(name = "LIADMINACCIONES")

public class Liadminacciones implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "AAIDACCIONES")
    private Integer aaidacciones;
    @Column(name = "AANOMBREACCIONES")
    private String aanombreacciones;
    @Column(name = "AAIDPADRE")
    private Integer aaidpadre;
    @Column(name = "AAHABILITADO")
    private Integer aahabilitado;
    @Column(name = "AAORDEN")
    private Integer aaorden;
    @Column(name = "AAICONOCLS")
    private String aaiconocls;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "aasidaccion", fetch = FetchType.LAZY)
    private Collection<Liadminaccionscript> liadminaccionscriptCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "amaidacciones", fetch = FetchType.LAZY)
    private Collection<Liadminmoduloacciones> liadminmoduloaccionesCollection;

    public Liadminacciones() {
    }

    public Liadminacciones(Integer aaidacciones) {
        this.aaidacciones = aaidacciones;
    }

    public Integer getAaidacciones() {
        return aaidacciones;
    }

    public void setAaidacciones(Integer aaidacciones) {
        this.aaidacciones = aaidacciones;
    }

    public String getAanombreacciones() {
        return aanombreacciones;
    }

    public void setAanombreacciones(String aanombreacciones) {
        this.aanombreacciones = aanombreacciones;
    }

    public Integer getAaidpadre() {
        return aaidpadre;
    }

    public void setAaidpadre(Integer aaidpadre) {
        this.aaidpadre = aaidpadre;
    }

    public Integer getAahabilitado() {
        return aahabilitado;
    }

    public void setAahabilitado(Integer aahabilitado) {
        this.aahabilitado = aahabilitado;
    }

    public Integer getAaorden() {
        return aaorden;
    }

    public void setAaorden(Integer aaorden) {
        this.aaorden = aaorden;
    }

    public String getAaiconocls() {
        return aaiconocls;
    }

    public void setAaiconocls(String aaiconocls) {
        this.aaiconocls = aaiconocls;
    }

    public Collection<Liadminaccionscript> getLiadminaccionscriptCollection() {
        return liadminaccionscriptCollection;
    }

    public void setLiadminaccionscriptCollection(Collection<Liadminaccionscript> liadminaccionscriptCollection) {
        this.liadminaccionscriptCollection = liadminaccionscriptCollection;
    }

    public Collection<Liadminmoduloacciones> getLiadminmoduloaccionesCollection() {
        return liadminmoduloaccionesCollection;
    }

    public void setLiadminmoduloaccionesCollection(Collection<Liadminmoduloacciones> liadminmoduloaccionesCollection) {
        this.liadminmoduloaccionesCollection = liadminmoduloaccionesCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (aaidacciones != null ? aaidacciones.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liadminacciones)) {
            return false;
        }
        Liadminacciones other = (Liadminacciones) object;
        if ((this.aaidacciones == null && other.aaidacciones != null) || (this.aaidacciones != null && !this.aaidacciones.equals(other.aaidacciones))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liadminacciones[aaidacciones=" + aaidacciones + "]";
    }

}
