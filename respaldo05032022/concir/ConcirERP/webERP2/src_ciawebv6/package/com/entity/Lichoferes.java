/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.util.Collection;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Marco Andrade
 */
@Entity
@Table(name = "LICHOFERES")
public class Lichoferes implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "CHOCLAVE")
    private Integer choclave;
    @Basic(optional = false)
    @Column(name = "CHONOMBRE")
    private String chonombre;
    @Basic(optional = false)
    @Column(name = "CHOPATERNO")
    private String chopaterno;
    @Column(name = "CHOMATERNO")
    private String chomaterno;
    @Column(name = "CHODIRECCION")
    private String chodireccion;
    @Column(name = "CHOTELEFONO")
    private String chotelefono;
    @Basic(optional = false)
    @Column(name = "CHONACIMIENTO")
    @Temporal(TemporalType.DATE)
    private Date chonacimiento;
    @Basic(optional = false)
    @Column(name = "CHOLICENCIA")
    private String cholicencia;
    @Basic(optional = false)
    @Column(name = "CHOVENCIMIENTO")
    @Temporal(TemporalType.DATE)
    private Date chovencimiento;
    @Basic(optional = false)
    @Column(name = "CHOESTATUS")
    private String choestatus;
    @Column(name = "CHORFC")
    private String chorfc;
    @Column(name = "CHOFECALTA")
    @Temporal(TemporalType.DATE)
    private Date chofecalta;
    @JoinColumn(name = "CHOPROVEEDOR", referencedColumnName = "PROCLAVE")
    @ManyToOne(fetch = FetchType.LAZY)
    private Liproveedores choproveedor;
    @OneToMany(mappedBy = "embchofer", fetch = FetchType.LAZY)
    private Collection<Liembarques> liembarquesCollection;

    public Lichoferes() {
    }

    public Lichoferes(Integer choclave) {
        this.choclave = choclave;
    }

    public Lichoferes(Integer choclave, String chonombre, String chopaterno, Date chonacimiento, String cholicencia, Date chovencimiento, String choestatus) {
        this.choclave = choclave;
        this.chonombre = chonombre;
        this.chopaterno = chopaterno;
        this.chonacimiento = chonacimiento;
        this.cholicencia = cholicencia;
        this.chovencimiento = chovencimiento;
        this.choestatus = choestatus;
    }

    public Integer getChoclave() {
        return choclave;
    }

    public void setChoclave(Integer choclave) {
        this.choclave = choclave;
    }

    public String getChonombre() {
        return chonombre;
    }

    public void setChonombre(String chonombre) {
        this.chonombre = chonombre;
    }

    public String getChopaterno() {
        return chopaterno;
    }

    public void setChopaterno(String chopaterno) {
        this.chopaterno = chopaterno;
    }

    public String getChomaterno() {
        return chomaterno;
    }

    public void setChomaterno(String chomaterno) {
        this.chomaterno = chomaterno;
    }

    public String getChodireccion() {
        return chodireccion;
    }

    public void setChodireccion(String chodireccion) {
        this.chodireccion = chodireccion;
    }

    public String getChotelefono() {
        return chotelefono;
    }

    public void setChotelefono(String chotelefono) {
        this.chotelefono = chotelefono;
    }

    public Date getChonacimiento() {
        return chonacimiento;
    }

    public void setChonacimiento(Date chonacimiento) {
        this.chonacimiento = chonacimiento;
    }

    public String getCholicencia() {
        return cholicencia;
    }

    public void setCholicencia(String cholicencia) {
        this.cholicencia = cholicencia;
    }

    public Date getChovencimiento() {
        return chovencimiento;
    }

    public void setChovencimiento(Date chovencimiento) {
        this.chovencimiento = chovencimiento;
    }

    public String getChoestatus() {
        return choestatus;
    }

    public void setChoestatus(String choestatus) {
        this.choestatus = choestatus;
    }

    public String getChorfc() {
        return chorfc;
    }

    public void setChorfc(String chorfc) {
        this.chorfc = chorfc;
    }

    public Date getChofecalta() {
        return chofecalta;
    }

    public void setChofecalta(Date chofecalta) {
        this.chofecalta = chofecalta;
    }

    public Liproveedores getChoproveedor() {
        return choproveedor;
    }

    public void setChoproveedor(Liproveedores choproveedor) {
        this.choproveedor = choproveedor;
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
        hash += (choclave != null ? choclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lichoferes)) {
            return false;
        }
        Lichoferes other = (Lichoferes) object;
        if ((this.choclave == null && other.choclave != null) || (this.choclave != null && !this.choclave.equals(other.choclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Lichoferes[choclave=" + choclave + "]";
    }

}
