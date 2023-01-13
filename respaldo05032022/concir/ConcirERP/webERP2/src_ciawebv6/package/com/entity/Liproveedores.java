/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "LIPROVEEDORES")
public class Liproveedores implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "PROCLAVE")
    private Integer proclave;
    @Basic(optional = false)
    @Column(name = "PRONOMBRE")
    private String pronombre;
    @Basic(optional = false)
    @Column(name = "PRODIRECCION")
    private String prodireccion;
    @Basic(optional = false)
    @Column(name = "PROTELEFONO")
    private String protelefono;
    @Column(name = "PRORFC")
    private String prorfc;
    @Basic(optional = false)
    @Column(name = "PROTIPOPAGO")
    private Integer protipopago;
    @Basic(optional = false)
    @Column(name = "PRODIASCREDITO")
    private Integer prodiascredito;
    @Basic(optional = false)
    @Column(name = "PROTIPO")
    private String protipo;
    @Column(name = "PROGPOGASTOS")
    private String progpogastos;
    @OneToMany(mappedBy = "choproveedor", fetch = FetchType.LAZY)
    private Collection<Lichoferes> lichoferesCollection;

    public Liproveedores() {
    }

    public Liproveedores(Integer proclave) {
        this.proclave = proclave;
    }

    public Liproveedores(Integer proclave, String pronombre, String prodireccion, String protelefono, Integer protipopago, Integer prodiascredito, String protipo) {
        this.proclave = proclave;
        this.pronombre = pronombre;
        this.prodireccion = prodireccion;
        this.protelefono = protelefono;
        this.protipopago = protipopago;
        this.prodiascredito = prodiascredito;
        this.protipo = protipo;
    }

    public Integer getProclave() {
        return proclave;
    }

    public void setProclave(Integer proclave) {
        this.proclave = proclave;
    }

    public String getPronombre() {
        return pronombre;
    }

    public void setPronombre(String pronombre) {
        this.pronombre = pronombre;
    }

    public String getProdireccion() {
        return prodireccion;
    }

    public void setProdireccion(String prodireccion) {
        this.prodireccion = prodireccion;
    }

    public String getProtelefono() {
        return protelefono;
    }

    public void setProtelefono(String protelefono) {
        this.protelefono = protelefono;
    }

    public String getProrfc() {
        return prorfc;
    }

    public void setProrfc(String prorfc) {
        this.prorfc = prorfc;
    }

    public Integer getProtipopago() {
        return protipopago;
    }

    public void setProtipopago(Integer protipopago) {
        this.protipopago = protipopago;
    }

    public Integer getProdiascredito() {
        return prodiascredito;
    }

    public void setProdiascredito(Integer prodiascredito) {
        this.prodiascredito = prodiascredito;
    }

    public String getProtipo() {
        return protipo;
    }

    public void setProtipo(String protipo) {
        this.protipo = protipo;
    }

    public String getProgpogastos() {
        return progpogastos;
    }

    public void setProgpogastos(String progpogastos) {
        this.progpogastos = progpogastos;
    }

    public Collection<Lichoferes> getLichoferesCollection() {
        return lichoferesCollection;
    }

    public void setLichoferesCollection(Collection<Lichoferes> lichoferesCollection) {
        this.lichoferesCollection = lichoferesCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (proclave != null ? proclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liproveedores)) {
            return false;
        }
        Liproveedores other = (Liproveedores) object;
        if ((this.proclave == null && other.proclave != null) || (this.proclave != null && !this.proclave.equals(other.proclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liproveedores[proclave=" + proclave + "]";
    }

}
