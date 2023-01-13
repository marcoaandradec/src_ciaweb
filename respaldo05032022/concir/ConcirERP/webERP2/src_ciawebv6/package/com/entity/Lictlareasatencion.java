/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
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
 * @author marco
 */
@Entity
@Table(name = "LICTLAREASATENCION")

public class Lictlareasatencion implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "CAAIDAREAATENCION")
    private Integer caaidareaatencion;
    @Column(name = "CAANOMBREAREA")
    private String caanombrearea;
    @Column(name = "CAAHABILITADO")
    private Integer caahabilitado;
    @Column(name = "CAAEMPRESA")
    private String caaempresa;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuidareaatencion", fetch = FetchType.LAZY)
    private Collection<Liusuarios> liusuariosCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "oidareaatencion", fetch = FetchType.LAZY)
    private Collection<Lictlorigen> lictlorigenCollection;

    public Lictlareasatencion() {
    }

    public Lictlareasatencion(Integer caaidareaatencion) {
        this.caaidareaatencion = caaidareaatencion;
    }

    public Integer getCaaidareaatencion() {
        return caaidareaatencion;
    }

    public void setCaaidareaatencion(Integer caaidareaatencion) {
        this.caaidareaatencion = caaidareaatencion;
    }

    public String getCaanombrearea() {
        return caanombrearea;
    }

    public void setCaanombrearea(String caanombrearea) {
        this.caanombrearea = caanombrearea;
    }

    public Integer getCaahabilitado() {
        return caahabilitado;
    }

    public void setCaahabilitado(Integer caahabilitado) {
        this.caahabilitado = caahabilitado;
    }

    public String getCaaempresa() {
        return caaempresa;
    }

    public void setCaaempresa(String caaempresa) {
        this.caaempresa = caaempresa;
    }

    public Collection<Liusuarios> getLiusuariosCollection() {
        return liusuariosCollection;
    }

    public void setLiusuariosCollection(Collection<Liusuarios> liusuariosCollection) {
        this.liusuariosCollection = liusuariosCollection;
    }

    public Collection<Lictlorigen> getLictlorigenCollection() {
        return lictlorigenCollection;
    }

    public void setLictlorigenCollection(Collection<Lictlorigen> lictlorigenCollection) {
        this.lictlorigenCollection = lictlorigenCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (caaidareaatencion != null ? caaidareaatencion.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lictlareasatencion)) {
            return false;
        }
        Lictlareasatencion other = (Lictlareasatencion) object;
        if ((this.caaidareaatencion == null && other.caaidareaatencion != null) || (this.caaidareaatencion != null && !this.caaidareaatencion.equals(other.caaidareaatencion))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Lictlareasatencion[caaidareaatencion=" + caaidareaatencion + "]";
    }

}
