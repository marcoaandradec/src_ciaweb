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
 * @author marco
 */
@Entity
@Table(name = "LICTLCODIGOSPOSTALES")

public class Lictlcodigospostales implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "CPSIDCODIGOPOSTAL")
    private Integer cpsidcodigopostal;
    @Column(name = "CPSCODIGOPOSTAL")
    private String cpscodigopostal;
    @Column(name = "CPSCOLONIA")
    private String cpscolonia;
    @Column(name = "CPSMUNICIPIO")
    private String cpsmunicipio;
    @Column(name = "CPSCIUDAD")
    private String cpsciudad;
    @Column(name = "CPSESTADO")
    private String cpsestado;
    @Column(name = "CPSTIPOASENTAMIENTO")
    private String cpstipoasentamiento;
    @Column(name = "CPSTIPOZONA")
    private String cpstipozona;

    public Lictlcodigospostales() {
    }

    public Lictlcodigospostales(Integer cpsidcodigopostal) {
        this.cpsidcodigopostal = cpsidcodigopostal;
    }

    public Integer getCpsidcodigopostal() {
        return cpsidcodigopostal;
    }

    public void setCpsidcodigopostal(Integer cpsidcodigopostal) {
        this.cpsidcodigopostal = cpsidcodigopostal;
    }

    public String getCpscodigopostal() {
        return cpscodigopostal;
    }

    public void setCpscodigopostal(String cpscodigopostal) {
        this.cpscodigopostal = cpscodigopostal;
    }

    public String getCpscolonia() {
        return cpscolonia;
    }

    public void setCpscolonia(String cpscolonia) {
        this.cpscolonia = cpscolonia;
    }

    public String getCpsmunicipio() {
        return cpsmunicipio;
    }

    public void setCpsmunicipio(String cpsmunicipio) {
        this.cpsmunicipio = cpsmunicipio;
    }

    public String getCpsciudad() {
        return cpsciudad;
    }

    public void setCpsciudad(String cpsciudad) {
        this.cpsciudad = cpsciudad;
    }

    public String getCpsestado() {
        return cpsestado;
    }

    public void setCpsestado(String cpsestado) {
        this.cpsestado = cpsestado;
    }

    public String getCpstipoasentamiento() {
        return cpstipoasentamiento;
    }

    public void setCpstipoasentamiento(String cpstipoasentamiento) {
        this.cpstipoasentamiento = cpstipoasentamiento;
    }

    public String getCpstipozona() {
        return cpstipozona;
    }

    public void setCpstipozona(String cpstipozona) {
        this.cpstipozona = cpstipozona;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cpsidcodigopostal != null ? cpsidcodigopostal.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lictlcodigospostales)) {
            return false;
        }
        Lictlcodigospostales other = (Lictlcodigospostales) object;
        if ((this.cpsidcodigopostal == null && other.cpsidcodigopostal != null) || (this.cpsidcodigopostal != null && !this.cpsidcodigopostal.equals(other.cpsidcodigopostal))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Lictlcodigospostales[cpsidcodigopostal=" + cpsidcodigopostal + "]";
    }

}
