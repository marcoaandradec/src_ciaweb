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
@Table(name = "LICOMBOOPCIONES")

public class Licomboopciones implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "COIDCOMBOOPCION")
    private Integer coidcomboopcion;
    @Column(name = "CONOMBRECOMBOOPC")
    private String conombrecomboopc;
    @Column(name = "COORDEN")
    private String coorden;
    @Column(name = "COHABILITADO")
    private Integer cohabilitado;
    @Column(name = "CONUMEROID")
    private Integer conumeroid;
    @JoinColumn(name = "COIDCOMBO", referencedColumnName = "CCIDCOMBO")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Lictlcombo coidcombo;

    public Licomboopciones() {
    }

    public Licomboopciones(Integer coidcomboopcion) {
        this.coidcomboopcion = coidcomboopcion;
    }

    public Integer getCoidcomboopcion() {
        return coidcomboopcion;
    }

    public void setCoidcomboopcion(Integer coidcomboopcion) {
        this.coidcomboopcion = coidcomboopcion;
    }

    public String getConombrecomboopc() {
        return conombrecomboopc;
    }

    public void setConombrecomboopc(String conombrecomboopc) {
        this.conombrecomboopc = conombrecomboopc;
    }

    public String getCoorden() {
        return coorden;
    }

    public void setCoorden(String coorden) {
        this.coorden = coorden;
    }

    public Integer getCohabilitado() {
        return cohabilitado;
    }

    public void setCohabilitado(Integer cohabilitado) {
        this.cohabilitado = cohabilitado;
    }

    public Integer getConumeroid() {
        return conumeroid;
    }

    public void setConumeroid(Integer conumeroid) {
        this.conumeroid = conumeroid;
    }

    public Lictlcombo getCoidcombo() {
        return coidcombo;
    }

    public void setCoidcombo(Lictlcombo coidcombo) {
        this.coidcombo = coidcombo;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (coidcomboopcion != null ? coidcomboopcion.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Licomboopciones)) {
            return false;
        }
        Licomboopciones other = (Licomboopciones) object;
        if ((this.coidcomboopcion == null && other.coidcomboopcion != null) || (this.coidcomboopcion != null && !this.coidcomboopcion.equals(other.coidcomboopcion))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Licomboopciones[coidcomboopcion=" + coidcomboopcion + "]";
    }

}
