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
 * @author Marco Andrade
 */
@Entity
@Table(name = "LIALMACENES")
public class Lialmacenes implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ALMCLAVE")
    private Integer almclave;
    @Basic(optional = false)
    @Column(name = "ALMNOMBRE")
    private String almnombre;
    @Column(name = "ALMDIRECCION")
    private String almdireccion;
    @Column(name = "ALMTELEFONO")
    private String almtelefono;
    @Column(name = "ALMFAX")
    private String almfax;
    @Column(name = "ALMUBIAJUSTE")
    private String almubiajuste;
    @Column(name = "ALMNUMEXT")
    private String almnumext;
    @Column(name = "ALMNUMINT")
    private String almnumint;
    @Column(name = "ALMLOCALIDAD")
    private String almlocalidad;
    @Column(name = "ALMESTADO")
    private String almestado;
    @Column(name = "ALMPAIS")
    private String almpais;
    @Column(name = "ALMDIREC2")
    private String almdirec2;
    @Column(name = "ALMDIREC3")
    private String almdirec3;
    @Column(name = "ALMCP")
    private String almcp;
    @Column(name = "ALMESTATUS")
    private Integer almestatus;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "embalmacen", fetch = FetchType.LAZY)
    private Collection<Liembarques> liembarquesCollection;

    public Lialmacenes() {
    }

    public Lialmacenes(Integer almclave) {
        this.almclave = almclave;
    }

    public Lialmacenes(Integer almclave, String almnombre) {
        this.almclave = almclave;
        this.almnombre = almnombre;
    }

    public Integer getAlmclave() {
        return almclave;
    }

    public void setAlmclave(Integer almclave) {
        this.almclave = almclave;
    }

    public String getAlmnombre() {
        return almnombre;
    }

    public void setAlmnombre(String almnombre) {
        this.almnombre = almnombre;
    }

    public String getAlmdireccion() {
        return almdireccion;
    }

    public void setAlmdireccion(String almdireccion) {
        this.almdireccion = almdireccion;
    }

    public String getAlmtelefono() {
        return almtelefono;
    }

    public void setAlmtelefono(String almtelefono) {
        this.almtelefono = almtelefono;
    }

    public String getAlmfax() {
        return almfax;
    }

    public void setAlmfax(String almfax) {
        this.almfax = almfax;
    }

    public String getAlmubiajuste() {
        return almubiajuste;
    }

    public void setAlmubiajuste(String almubiajuste) {
        this.almubiajuste = almubiajuste;
    }

    public String getAlmnumext() {
        return almnumext;
    }

    public void setAlmnumext(String almnumext) {
        this.almnumext = almnumext;
    }

    public String getAlmnumint() {
        return almnumint;
    }

    public void setAlmnumint(String almnumint) {
        this.almnumint = almnumint;
    }

    public String getAlmlocalidad() {
        return almlocalidad;
    }

    public void setAlmlocalidad(String almlocalidad) {
        this.almlocalidad = almlocalidad;
    }

    public String getAlmestado() {
        return almestado;
    }

    public void setAlmestado(String almestado) {
        this.almestado = almestado;
    }

    public String getAlmpais() {
        return almpais;
    }

    public void setAlmpais(String almpais) {
        this.almpais = almpais;
    }

    public String getAlmdirec2() {
        return almdirec2;
    }

    public void setAlmdirec2(String almdirec2) {
        this.almdirec2 = almdirec2;
    }

    public String getAlmdirec3() {
        return almdirec3;
    }

    public void setAlmdirec3(String almdirec3) {
        this.almdirec3 = almdirec3;
    }

    public String getAlmcp() {
        return almcp;
    }

    public void setAlmcp(String almcp) {
        this.almcp = almcp;
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
        hash += (almclave != null ? almclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lialmacenes)) {
            return false;
        }
        Lialmacenes other = (Lialmacenes) object;
        if ((this.almclave == null && other.almclave != null) || (this.almclave != null && !this.almclave.equals(other.almclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Lialmacenes[almclave=" + almclave + "]";
    }

    /**
     * @return the almestatus
     */
    public Integer getAlmestatus() {
        return almestatus;
    }

    /**
     * @param almestatus the almestatus to set
     */
    public void setAlmestatus(Integer almestatus) {
        this.almestatus = almestatus;
    }

}
