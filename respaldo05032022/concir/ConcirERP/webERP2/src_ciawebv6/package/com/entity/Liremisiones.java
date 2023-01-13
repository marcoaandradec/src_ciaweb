/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Marco Andrade
 */
@Entity
@Table(name = "LIREMISIONES")
public class Liremisiones implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "REMFOLIO")
    private Integer remfolio;
    @Basic(optional = false)
    @Column(name = "REMFECHA")
    @Temporal(TemporalType.DATE)
    private Date remfecha;
    @Basic(optional = false)
    @Column(name = "REMTIPO")
    private Integer remtipo;
    @Column(name = "REMCOMS")
    private String remcoms;
    @Basic(optional = false)
    @Column(name = "REMCVERECIBO")
    private Integer remcverecibo;
    @Basic(optional = false)
    @Column(name = "REMUSUARIO")
    private Integer remusuario;
    @Column(name = "REMREFERENCIA")
    private String remreferencia;
    @Column(name = "REMFECSURTIDO")
    @Temporal(TemporalType.DATE)
    private Date remfecsurtido;
    @JoinColumn(name = "REMALMACEN", referencedColumnName = "ALMCLAVE")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Lialmacenes remalmacen;
    @JoinColumn(name = "REMEMPRESA", referencedColumnName = "EMPCLAVE")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Liempresas remempresa;

    public Liremisiones() {
    }

    public Liremisiones(Integer remfolio) {
        this.remfolio = remfolio;
    }

    public Liremisiones(Integer remfolio, Date remfecha, Integer remtipo, Integer remcverecibo, Integer remusuario) {
        this.remfolio = remfolio;
        this.remfecha = remfecha;
        this.remtipo = remtipo;
        this.remcverecibo = remcverecibo;
        this.remusuario = remusuario;
    }

    public Integer getRemfolio() {
        return remfolio;
    }

    public void setRemfolio(Integer remfolio) {
        this.remfolio = remfolio;
    }

    public Date getRemfecha() {
        return remfecha;
    }

    public void setRemfecha(Date remfecha) {
        this.remfecha = remfecha;
    }

    public Integer getRemtipo() {
        return remtipo;
    }

    public void setRemtipo(Integer remtipo) {
        this.remtipo = remtipo;
    }

    public String getRemcoms() {
        return remcoms;
    }

    public void setRemcoms(String remcoms) {
        this.remcoms = remcoms;
    }

    public long getRemcverecibo() {
        return remcverecibo;
    }

    public void setRemcverecibo(Integer remcverecibo) {
        this.remcverecibo = remcverecibo;
    }

    public Integer getRemusuario() {
        return remusuario;
    }

    public void setRemusuario(Integer remusuario) {
        this.remusuario = remusuario;
    }

    public String getRemreferencia() {
        return remreferencia;
    }

    public void setRemreferencia(String remreferencia) {
        this.remreferencia = remreferencia;
    }

    public Date getRemfecsurtido() {
        return remfecsurtido;
    }

    public void setRemfecsurtido(Date remfecsurtido) {
        this.remfecsurtido = remfecsurtido;
    }

    public Lialmacenes getRemalmacen() {
        return remalmacen;
    }

    public void setRemalmacen(Lialmacenes remalmacen) {
        this.remalmacen = remalmacen;
    }

    public Liempresas getRemempresa() {
        return remempresa;
    }

    public void setRemempresa(Liempresas remempresa) {
        this.remempresa = remempresa;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (remfolio != null ? remfolio.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liremisiones)) {
            return false;
        }
        Liremisiones other = (Liremisiones) object;
        if ((this.remfolio == null && other.remfolio != null) || (this.remfolio != null && !this.remfolio.equals(other.remfolio))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liremisiones[remfolio=" + remfolio + "]";
    }

}
