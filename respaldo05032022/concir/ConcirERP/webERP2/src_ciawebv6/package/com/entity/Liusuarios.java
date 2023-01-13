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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Sistemas
 */
@Entity
@Table(name = "LIUSUARIOS")
public class Liusuarios implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "USUCLAVE")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQLIUSUARIOS")
    @SequenceGenerator(name="SEQLIUSUARIOS", sequenceName = "SEQLIUSUARIOS",allocationSize=1)
    private Integer usuclave;
    @Basic(optional = false)
    @Column(name = "USUNOMBRE")
    private String usunombre;
    @Basic(optional = false)
    @Column(name = "USUPATERNO")
    private String usupaterno;
    @Column(name = "USUMATERNO")
    private String usumaterno;
    @Basic(optional = false)
    @Column(name = "USULOGIN")
    private String usulogin;
    @Basic(optional = false)
    @Column(name = "USUPASSWORD")
    private String usupassword;
    @Column(name = "USUDIRECCION")
    private String usudireccion;
    @Column(name = "USUTELEFONO")
    private String usutelefono;
    @Basic(optional = false)
    @Column(name = "USUESTATUS")
    private String usuestatus;
    @Basic(optional = false)
    @Column(name = "USUTIPO")
    private String usutipo;
    @Column(name = "USUEMPRESA")
    private Integer usuempresa;
    @Column(name = "USUACCESO")
    private Short usuacceso;
    @Column(name = "USUCOLONIA")
    private String usucolonia;
    @Column(name = "USUCP")
    private String usucp;
    @Column(name = "USUDELEGMUNIP")
    private String usudelegmunip;
    @Column(name = "USUESTADO")
    private String usuestado;
    @Column(name = "USUFECHAALTA")
    @Temporal(TemporalType.DATE)
    private Date usufechaalta;
    @Column(name = "USUFECHANAC")
    @Temporal(TemporalType.DATE)
    private Date usufechanac;
    @Column(name = "USUNUMEXT")
    private String usunumext;
    @Column(name = "USUNUMINT")
    private String usunumint;
    @Column(name = "USUPASSWORDWEB")
    private String usupasswordweb;
    @Column(name = "USUSEXO")
    private String ususexo;
    @JoinColumn(name = "USUIDAREAATENCION", referencedColumnName = "CAAIDAREAATENCION")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Lictlareasatencion usuidareaatencion;
    @JoinColumn(name = "USUIDORIGEN", referencedColumnName = "OIDORIGEN")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Lictlorigen usuidorigen;
    @JoinColumn(name = "USUDEPARTAMENTO", referencedColumnName = "DEPCLAVE")
    @ManyToOne(fetch = FetchType.LAZY)
    private Lidepartamentos usudepartamento;
    @JoinColumn(name = "USUIDPUESTO", referencedColumnName = "UPIDPUESTO")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Liusuariopuesto usuidpuesto;

    public Liusuarios() {
    }

    public Liusuarios(Integer usuclave) {
        this.usuclave = usuclave;
    }

    public Liusuarios(Integer usuclave, String usunombre, String usupaterno, String usulogin, String usupassword, String usuestatus, String usutipo) {
        this.usuclave = usuclave;
        this.usunombre = usunombre;
        this.usupaterno = usupaterno;
        this.usulogin = usulogin;
        this.usupassword = usupassword;
        this.usuestatus = usuestatus;
        this.usutipo = usutipo;
    }

    public Integer getUsuclave() {
        return usuclave;
    }

    public void setUsuclave(Integer usuclave) {
        this.usuclave = usuclave;
    }

    public String getUsunombre() {
        return usunombre;
    }

    public void setUsunombre(String usunombre) {
        this.usunombre = usunombre;
    }

    public String getUsupaterno() {
        return usupaterno;
    }

    public void setUsupaterno(String usupaterno) {
        this.usupaterno = usupaterno;
    }

    public String getUsumaterno() {
        return usumaterno;
    }

    public void setUsumaterno(String usumaterno) {
        this.usumaterno = usumaterno;
    }

    public String getUsulogin() {
        return usulogin;
    }

    public void setUsulogin(String usulogin) {
        this.usulogin = usulogin;
    }

    public String getUsupassword() {
        return usupassword;
    }

    public void setUsupassword(String usupassword) {
        this.usupassword = usupassword;
    }

    public String getUsudireccion() {
        return usudireccion;
    }

    public void setUsudireccion(String usudireccion) {
        this.usudireccion = usudireccion;
    }

    public String getUsutelefono() {
        return usutelefono;
    }

    public void setUsutelefono(String usutelefono) {
        this.usutelefono = usutelefono;
    }

    public String getUsuestatus() {
        return usuestatus;
    }

    public void setUsuestatus(String usuestatus) {
        this.usuestatus = usuestatus;
    }

    public String getUsutipo() {
        return usutipo;
    }

    public void setUsutipo(String usutipo) {
        this.usutipo = usutipo;
    }

    public Integer getUsuempresa() {
        return usuempresa;
    }

    public void setUsuempresa(Integer usuempresa) {
        this.usuempresa = usuempresa;
    }

    public Short getUsuacceso() {
        return usuacceso;
    }

    public void setUsuacceso(Short usuacceso) {
        this.usuacceso = usuacceso;
    }

    public String getUsucolonia() {
        return usucolonia;
    }

    public void setUsucolonia(String usucolonia) {
        this.usucolonia = usucolonia;
    }

    public String getUsucp() {
        return usucp;
    }

    public void setUsucp(String usucp) {
        this.usucp = usucp;
    }

    public String getUsudelegmunip() {
        return usudelegmunip;
    }

    public void setUsudelegmunip(String usudelegmunip) {
        this.usudelegmunip = usudelegmunip;
    }

    public String getUsuestado() {
        return usuestado;
    }

    public void setUsuestado(String usuestado) {
        this.usuestado = usuestado;
    }

    public Date getUsufechaalta() {
        return usufechaalta;
    }

    public void setUsufechaalta(Date usufechaalta) {
        this.usufechaalta = usufechaalta;
    }

    public Date getUsufechanac() {
        return usufechanac;
    }

    public void setUsufechanac(Date usufechanac) {
        this.usufechanac = usufechanac;
    }

    public String getUsunumext() {
        return usunumext;
    }

    public void setUsunumext(String usunumext) {
        this.usunumext = usunumext;
    }

    public String getUsunumint() {
        return usunumint;
    }

    public void setUsunumint(String usunumint) {
        this.usunumint = usunumint;
    }

    public String getUsupasswordweb() {
        return usupasswordweb;
    }

    public void setUsupasswordweb(String usupasswordweb) {
        this.usupasswordweb = usupasswordweb;
    }

    public String getUsusexo() {
        return ususexo;
    }

    public void setUsusexo(String ususexo) {
        this.ususexo = ususexo;
    }

    public Lictlareasatencion getUsuidareaatencion() {
        return usuidareaatencion;
    }

    public void setUsuidareaatencion(Lictlareasatencion usuidareaatencion) {
        this.usuidareaatencion = usuidareaatencion;
    }

    public Lictlorigen getUsuidorigen() {
        return usuidorigen;
    }

    public void setUsuidorigen(Lictlorigen usuidorigen) {
        this.usuidorigen = usuidorigen;
    }

    public Lidepartamentos getUsudepartamento() {
        return usudepartamento;
    }

    public void setUsudepartamento(Lidepartamentos usudepartamento) {
        this.usudepartamento = usudepartamento;
    }

    public Liusuariopuesto getUsuidpuesto() {
        return usuidpuesto;
    }

    public void setUsuidpuesto(Liusuariopuesto usuidpuesto) {
        this.usuidpuesto = usuidpuesto;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (usuclave != null ? usuclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liusuarios)) {
            return false;
        }
        Liusuarios other = (Liusuarios) object;
        if ((this.usuclave == null && other.usuclave != null) || (this.usuclave != null && !this.usuclave.equals(other.usuclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liusuarios[usuclave=" + usuclave + "]";
    }

}
