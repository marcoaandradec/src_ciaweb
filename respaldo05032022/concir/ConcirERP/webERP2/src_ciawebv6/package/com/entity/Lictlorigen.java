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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author marco
 */
@Entity
@Table(name = "LICTLORIGEN")

public class Lictlorigen implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "OIDORIGEN")
    private Integer oidorigen;
    @Column(name = "ONOMBREORIGEN")
    private String onombreorigen;
    @Column(name = "OHABILITADO")
    private Integer ohabilitado;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuidorigen", fetch = FetchType.LAZY)
    private Collection<Liusuarios> liusuariosCollection;
    @JoinColumn(name = "OIDAREAATENCION", referencedColumnName = "CAAIDAREAATENCION")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Lictlareasatencion oidareaatencion;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "upidorigen", fetch = FetchType.LAZY)
    private Collection<Liusuariopuesto> liusuariopuestoCollection;

    public Lictlorigen() {
    }

    public Lictlorigen(Integer oidorigen) {
        this.oidorigen = oidorigen;
    }

    public Integer getOidorigen() {
        return oidorigen;
    }

    public void setOidorigen(Integer oidorigen) {
        this.oidorigen = oidorigen;
    }

    public String getOnombreorigen() {
        return onombreorigen;
    }

    public void setOnombreorigen(String onombreorigen) {
        this.onombreorigen = onombreorigen;
    }

    public Integer getOhabilitado() {
        return ohabilitado;
    }

    public void setOhabilitado(Integer ohabilitado) {
        this.ohabilitado = ohabilitado;
    }

    public Collection<Liusuarios> getLiusuariosCollection() {
        return liusuariosCollection;
    }

    public void setLiusuariosCollection(Collection<Liusuarios> liusuariosCollection) {
        this.liusuariosCollection = liusuariosCollection;
    }

    public Lictlareasatencion getOidareaatencion() {
        return oidareaatencion;
    }

    public void setOidareaatencion(Lictlareasatencion oidareaatencion) {
        this.oidareaatencion = oidareaatencion;
    }

    public Collection<Liusuariopuesto> getLiusuariopuestoCollection() {
        return liusuariopuestoCollection;
    }

    public void setLiusuariopuestoCollection(Collection<Liusuariopuesto> liusuariopuestoCollection) {
        this.liusuariopuestoCollection = liusuariopuestoCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (oidorigen != null ? oidorigen.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lictlorigen)) {
            return false;
        }
        Lictlorigen other = (Lictlorigen) object;
        if ((this.oidorigen == null && other.oidorigen != null) || (this.oidorigen != null && !this.oidorigen.equals(other.oidorigen))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Lictlorigen[oidorigen=" + oidorigen + "]";
    }

}
