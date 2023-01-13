/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.util.Set;
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
@Table(name = "LIMOTRECHAZOS")
public class Limotrechazos implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "MRECLAVE")
    private Integer mreclave;
    @Basic(optional = false)
    @Column(name = "MREDESCRIPCION")
    private String mredescripcion;
    @OneToMany(mappedBy = "embconcrechazo", fetch = FetchType.LAZY)
    private Set<Liembarques> liembarquesSet;

    public Limotrechazos() {
    }

    public Limotrechazos(Integer mreclave) {
        this.mreclave = mreclave;
    }

    public Limotrechazos(Integer mreclave, String mredescripcion) {
        this.mreclave = mreclave;
        this.mredescripcion = mredescripcion;
    }

    public Integer getMreclave() {
        return mreclave;
    }

    public void setMreclave(Integer mreclave) {
        this.mreclave = mreclave;
    }

    public String getMredescripcion() {
        return mredescripcion;
    }

    public void setMredescripcion(String mredescripcion) {
        this.mredescripcion = mredescripcion;
    }

    public Set<Liembarques> getLiembarquesSet() {
        return liembarquesSet;
    }

    public void setLiembarquesSet(Set<Liembarques> liembarquesSet) {
        this.liembarquesSet = liembarquesSet;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (mreclave != null ? mreclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Limotrechazos)) {
            return false;
        }
        Limotrechazos other = (Limotrechazos) object;
        if ((this.mreclave == null && other.mreclave != null) || (this.mreclave != null && !this.mreclave.equals(other.mreclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Limotrechazos[mreclave=" + mreclave + "]";
    }

}
