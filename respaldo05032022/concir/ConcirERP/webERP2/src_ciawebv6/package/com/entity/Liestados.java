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
@Table(name = "LIESTADOS")
public class Liestados implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ESTCLAVE")
    private Integer estclave;
    @Basic(optional = false)
    @Column(name = "ESTNOMBRE")
    private String estnombre;
    @OneToMany(mappedBy = "embestado", fetch = FetchType.LAZY)
    private Collection<Liembarques> liembarquesCollection;

    public Liestados() {
    }

    public Liestados(Integer estclave) {
        this.estclave = estclave;
    }

    public Liestados(Integer estclave, String estnombre) {
        this.estclave = estclave;
        this.estnombre = estnombre;
    }

    public Integer getEstclave() {
        return estclave;
    }

    public void setEstclave(Integer estclave) {
        this.estclave = estclave;
    }

    public String getEstnombre() {
        return estnombre;
    }

    public void setEstnombre(String estnombre) {
        this.estnombre = estnombre;
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
        hash += (estclave != null ? estclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liestados)) {
            return false;
        }
        Liestados other = (Liestados) object;
        if ((this.estclave == null && other.estclave != null) || (this.estclave != null && !this.estclave.equals(other.estclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liestados[estclave=" + estclave + "]";
    }

}
