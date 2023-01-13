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
@Table(name = "LIADMINROLMODULO")

public class Liadminrolmodulo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ARMIDROLMODULO")
    private Integer armidrolmodulo;
    @JoinColumn(name = "ARMIDADMINMODULO", referencedColumnName = "AMIDMODULO")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Liadminmodulo armidadminmodulo;
    @JoinColumn(name = "ARMIDPUESTO", referencedColumnName = "UPIDPUESTO")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Liusuariopuesto armidpuesto;

    public Liadminrolmodulo() {
    }

    public Liadminrolmodulo(Integer armidrolmodulo) {
        this.armidrolmodulo = armidrolmodulo;
    }

    public Integer getArmidrolmodulo() {
        return armidrolmodulo;
    }

    public void setArmidrolmodulo(Integer armidrolmodulo) {
        this.armidrolmodulo = armidrolmodulo;
    }

    public Liadminmodulo getArmidadminmodulo() {
        return armidadminmodulo;
    }

    public void setArmidadminmodulo(Liadminmodulo armidadminmodulo) {
        this.armidadminmodulo = armidadminmodulo;
    }

    public Liusuariopuesto getArmidpuesto() {
        return armidpuesto;
    }

    public void setArmidpuesto(Liusuariopuesto armidpuesto) {
        this.armidpuesto = armidpuesto;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (armidrolmodulo != null ? armidrolmodulo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liadminrolmodulo)) {
            return false;
        }
        Liadminrolmodulo other = (Liadminrolmodulo) object;
        if ((this.armidrolmodulo == null && other.armidrolmodulo != null) || (this.armidrolmodulo != null && !this.armidrolmodulo.equals(other.armidrolmodulo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liadminrolmodulo[armidrolmodulo=" + armidrolmodulo + "]";
    }

}
