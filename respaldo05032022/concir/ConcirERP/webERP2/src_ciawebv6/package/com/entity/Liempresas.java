/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
@Table(name = "LIEMPRESAS")
public class Liempresas implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "EMPCLAVE")
    private Integer empclave;
    @Basic(optional = false)
    @Column(name = "EMPNOMBRE")
    private String empnombre;
    @Basic(optional = false)
    @Column(name = "EMPNOMCORTO")
    private String empnomcorto;
    @Column(name = "EMPDIRECCION")
    private String empdireccion;
    @Column(name = "EMPCOLONIA")
    private String empcolonia;
    @Column(name = "EMPCIUDAD")
    private String empciudad;
    @Column(name = "EMPENCDISTRIB")
    private String empencdistrib;
    @Column(name = "EMPENCVTAS")
    private String empencvtas;
    @Column(name = "EMPENCALMACEN")
    private String empencalmacen;
    @Column(name = "EMPENCSERVCLI")
    private String empencservcli;
    @Column(name = "EMPTELDISTRIB")
    private String empteldistrib;
    @Column(name = "EMPTELVTAS")
    private String emptelvtas;
    @Column(name = "EMPTELALMACEN")
    private String emptelalmacen;
    @Column(name = "EMPTELSERVCLI")
    private String emptelservcli;
    @Column(name = "EMPVOLPROM")
    private Double empvolprom;
    @Column(name = "EMPPESOPROM")
    private Integer emppesoprom;
    @Column(name = "EMPRFC")
    private String emprfc;
    @Column(name = "EMPPZOPAGO")
    private Double emppzopago;
    @Column(name = "EMPVENTAS")
    private String empventas;
    @Basic(optional = false)
    @Column(name = "EMPTIPOFAC")
    private String emptipofac;
    @Basic(optional = false)
    @Column(name = "EMPESTATUS")
    private String empestatus;
    @Column(name = "EMPNUMEXT")
    private String empnumext;
    @Column(name = "EMPNUMINT")
    private String empnumint;
    @Column(name = "EMPLOCALIDAD")
    private String emplocalidad;
    @Column(name = "EMPESTADO")
    private String empestado;
    @Column(name = "EMPPAIS")
    private String emppais;
    @Column(name = "EMPCP")
    private String empcp;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "cliempresa", fetch = FetchType.LAZY)
    private Collection<Liclientes> liclientesCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "embempresa", fetch = FetchType.LAZY)
    private Collection<Liembarques> liembarquesCollection;

    public Liempresas() {
    }

    public Liempresas(Integer empclave) {
        this.empclave = empclave;
    }

    public Liempresas(Integer empclave, String empnombre, String empnomcorto, String emptipofac, String empestatus) {
        this.empclave = empclave;
        this.empnombre = empnombre;
        this.empnomcorto = empnomcorto;
        this.emptipofac = emptipofac;
        this.empestatus = empestatus;
    }

    public Integer getEmpclave() {
        return empclave;
    }

    public void setEmpclave(Integer empclave) {
        this.empclave = empclave;
    }

    public String getEmpnombre() {
        return empnombre;
    }

    public void setEmpnombre(String empnombre) {
        this.empnombre = empnombre;
    }

    public String getEmpnomcorto() {
        return empnomcorto;
    }

    public void setEmpnomcorto(String empnomcorto) {
        this.empnomcorto = empnomcorto;
    }

    public String getEmpdireccion() {
        return empdireccion;
    }

    public void setEmpdireccion(String empdireccion) {
        this.empdireccion = empdireccion;
    }

    public String getEmpcolonia() {
        return empcolonia;
    }

    public void setEmpcolonia(String empcolonia) {
        this.empcolonia = empcolonia;
    }

    public String getEmpciudad() {
        return empciudad;
    }

    public void setEmpciudad(String empciudad) {
        this.empciudad = empciudad;
    }

    public String getEmpencdistrib() {
        return empencdistrib;
    }

    public void setEmpencdistrib(String empencdistrib) {
        this.empencdistrib = empencdistrib;
    }

    public String getEmpencvtas() {
        return empencvtas;
    }

    public void setEmpencvtas(String empencvtas) {
        this.empencvtas = empencvtas;
    }

    public String getEmpencalmacen() {
        return empencalmacen;
    }

    public void setEmpencalmacen(String empencalmacen) {
        this.empencalmacen = empencalmacen;
    }

    public String getEmpencservcli() {
        return empencservcli;
    }

    public void setEmpencservcli(String empencservcli) {
        this.empencservcli = empencservcli;
    }

    public String getEmpteldistrib() {
        return empteldistrib;
    }

    public void setEmpteldistrib(String empteldistrib) {
        this.empteldistrib = empteldistrib;
    }

    public String getEmptelvtas() {
        return emptelvtas;
    }

    public void setEmptelvtas(String emptelvtas) {
        this.emptelvtas = emptelvtas;
    }

    public String getEmptelalmacen() {
        return emptelalmacen;
    }

    public void setEmptelalmacen(String emptelalmacen) {
        this.emptelalmacen = emptelalmacen;
    }

    public String getEmptelservcli() {
        return emptelservcli;
    }

    public void setEmptelservcli(String emptelservcli) {
        this.emptelservcli = emptelservcli;
    }

    public Double getEmpvolprom() {
        return empvolprom;
    }

    public void setEmpvolprom(Double empvolprom) {
        this.empvolprom = empvolprom;
    }

    public Integer getEmppesoprom() {
        return emppesoprom;
    }

    public void setEmppesoprom(Integer emppesoprom) {
        this.emppesoprom = emppesoprom;
    }

    public String getEmprfc() {
        return emprfc;
    }

    public void setEmprfc(String emprfc) {
        this.emprfc = emprfc;
    }

    public Double getEmppzopago() {
        return emppzopago;
    }

    public void setEmppzopago(Double emppzopago) {
        this.emppzopago = emppzopago;
    }

    public String getEmpventas() {
        return empventas;
    }

    public void setEmpventas(String empventas) {
        this.empventas = empventas;
    }

    public String getEmptipofac() {
        return emptipofac;
    }

    public void setEmptipofac(String emptipofac) {
        this.emptipofac = emptipofac;
    }

    public String getEmpestatus() {
        return empestatus;
    }

    public void setEmpestatus(String empestatus) {
        this.empestatus = empestatus;
    }

    public String getEmpnumext() {
        return empnumext;
    }

    public void setEmpnumext(String empnumext) {
        this.empnumext = empnumext;
    }

    public String getEmpnumint() {
        return empnumint;
    }

    public void setEmpnumint(String empnumint) {
        this.empnumint = empnumint;
    }

    public String getEmplocalidad() {
        return emplocalidad;
    }

    public void setEmplocalidad(String emplocalidad) {
        this.emplocalidad = emplocalidad;
    }

    public String getEmpestado() {
        return empestado;
    }

    public void setEmpestado(String empestado) {
        this.empestado = empestado;
    }

    public String getEmppais() {
        return emppais;
    }

    public void setEmppais(String emppais) {
        this.emppais = emppais;
    }

    public String getEmpcp() {
        return empcp;
    }

    public void setEmpcp(String empcp) {
        this.empcp = empcp;
    }

    public Collection<Liclientes> getLiclientesCollection() {
        return liclientesCollection;
    }

    public void setLiclientesCollection(Collection<Liclientes> liclientesCollection) {
        this.liclientesCollection = liclientesCollection;
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
        hash += (empclave != null ? empclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liempresas)) {
            return false;
        }
        Liempresas other = (Liempresas) object;
        if ((this.empclave == null && other.empclave != null) || (this.empclave != null && !this.empclave.equals(other.empclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liempresas[empclave=" + empclave + "]";
    }

}
