/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author marco
 */
@Entity
@Table(name = "LIPUESTOORIGEN")
public class Lipuestoorigen implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "POIDPUESTOORIGEN")
    private Integer poidpuestoorigen;
    @JoinColumn(name = "POIDORIGEN", referencedColumnName = "OIDORIGEN")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Lictlorigen poidorigen;
    @JoinColumn(name = "POIDPUESTO", referencedColumnName = "UPIDPUESTO")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Liusuariopuesto poidpuesto;

    public Lipuestoorigen() {
    }

    public Lipuestoorigen(Integer poidpuestoorigen) {
        this.poidpuestoorigen = poidpuestoorigen;
    }

    public Integer getPoidpuestoorigen() {
        return poidpuestoorigen;
    }

    public void setPoidpuestoorigen(Integer poidpuestoorigen) {
        this.poidpuestoorigen = poidpuestoorigen;
    }

    public Lictlorigen getPoidorigen() {
        return poidorigen;
    }

    public void setPoidorigen(Lictlorigen poidorigen) {
        this.poidorigen = poidorigen;
    }

    public Liusuariopuesto getPoidpuesto() {
        return poidpuesto;
    }

    public void setPoidpuesto(Liusuariopuesto poidpuesto) {
        this.poidpuesto = poidpuesto;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (poidpuestoorigen != null ? poidpuestoorigen.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lipuestoorigen)) {
            return false;
        }
        Lipuestoorigen other = (Lipuestoorigen) object;
        if ((this.poidpuestoorigen == null && other.poidpuestoorigen != null) || (this.poidpuestoorigen != null && !this.poidpuestoorigen.equals(other.poidpuestoorigen))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Lipuestoorigen[poidpuestoorigen=" + poidpuestoorigen + "]";
    }

}
