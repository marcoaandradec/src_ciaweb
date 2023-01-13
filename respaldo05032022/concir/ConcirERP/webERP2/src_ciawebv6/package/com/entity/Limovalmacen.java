/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author Sistemas
 */
@Entity
@Table(name = "LIMOVALMACEN")
public class Limovalmacen implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "MOVCLAVE")
    private Integer movclave;
    @Basic(optional = false)
    @Column(name = "MOVDESCRIPCION")
    private String movdescripcion;
    @Basic(optional = false)
    @Column(name = "MOVTIPO")
    private String movtipo;
    @Column(name = "MOVEMBARCAR")
    private String movembarcar;

    public Limovalmacen() {
    }

    public Limovalmacen(Integer movclave) {
        this.movclave = movclave;
    }

    public Limovalmacen(Integer movclave, String movdescripcion, String movtipo) {
        this.movclave = movclave;
        this.movdescripcion = movdescripcion;
        this.movtipo = movtipo;
    }

    public Integer getMovclave() {
        return movclave;
    }

    public void setMovclave(Integer movclave) {
        this.movclave = movclave;
    }

    public String getMovdescripcion() {
        return movdescripcion;
    }

    public void setMovdescripcion(String movdescripcion) {
        this.movdescripcion = movdescripcion;
    }

    public String getMovtipo() {
        return movtipo;
    }

    public void setMovtipo(String movtipo) {
        this.movtipo = movtipo;
    }

    public String getMovembarcar() {
        return movembarcar;
    }

    public void setMovembarcar(String movembarcar) {
        this.movembarcar = movembarcar;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (movclave != null ? movclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Limovalmacen)) {
            return false;
        }
        Limovalmacen other = (Limovalmacen) object;
        if ((this.movclave == null && other.movclave != null) || (this.movclave != null && !this.movclave.equals(other.movclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Limovalmacen[movclave=" + movclave + "]";
    }

}
