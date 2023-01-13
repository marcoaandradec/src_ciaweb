/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author Marco Andrade
 */
@Entity
@Table(name = "LITIPOCLIENTE")
public class Litipocliente implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "TCLCLAVE")
    private String tclclave;
    @Basic(optional = false)
    @Column(name = "TCLDESCRIPCION")
    private String tcldescripcion;
    @Basic(optional = false)
    @Column(name = "TCLNUMERO")
    private Integer tclnumero;
    @Column(name = "TCLPESOENT")
    private Double tclpesoent;

    public Litipocliente() {
    }

    public Litipocliente(String tclclave) {
        this.tclclave = tclclave;
    }

    public Litipocliente(String tclclave, String tcldescripcion, Integer tclnumero) {
        this.tclclave = tclclave;
        this.tcldescripcion = tcldescripcion;
        this.tclnumero = tclnumero;
    }

    public String getTclclave() {
        return tclclave;
    }

    public void setTclclave(String tclclave) {
        this.tclclave = tclclave;
    }

    public String getTcldescripcion() {
        return tcldescripcion;
    }

    public void setTcldescripcion(String tcldescripcion) {
        this.tcldescripcion = tcldescripcion;
    }

    public Integer getTclnumero() {
        return tclnumero;
    }

    public void setTclnumero(Integer tclnumero) {
        this.tclnumero = tclnumero;
    }

    public double getTclpesoent() {
        return tclpesoent;
    }

    public void setTclpesoent(double tclpesoent) {
        this.tclpesoent = tclpesoent;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (tclclave != null ? tclclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Litipocliente)) {
            return false;
        }
        Litipocliente other = (Litipocliente) object;
        if ((this.tclclave == null && other.tclclave != null) || (this.tclclave != null && !this.tclclave.equals(other.tclclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Litipocliente[tclclave=" + tclclave + "]";
    }

}
