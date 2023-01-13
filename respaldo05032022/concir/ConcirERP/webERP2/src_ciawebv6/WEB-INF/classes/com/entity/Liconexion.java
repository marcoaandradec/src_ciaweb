/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.entity;

import java.io.Serializable;
import java.util.*;
import javax.persistence.*;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author mandrade
 */
@Entity
@Table(name = "LICONEXION")
public class Liconexion implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "CLAVE")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_LICONEXION")
    @SequenceGenerator(name="SEQ_LICONEXION", sequenceName = "SEQ_LICONEXION",initialValue=1, allocationSize=1)
    private Integer clave;
    @Column(name = "SID")
    private Integer sid;
    @Column(name = "SERIAL")
    private Integer serial;
    @Column(name = "OSUSER")
    private String osuser;
    @Column(name = "MACHINE")
    private String machine;
    @Column(name = "USUARIO")
    private Integer usuario;
    @Column(name = "ENTRADA")
    @Temporal(TemporalType.DATE)
    private Date entrada;
    @Column(name = "SALIDA")
    @Temporal(TemporalType.DATE)
    private Date salida;

    public Liconexion() {
    }

    public Liconexion(Integer clave) {
        this.clave = clave;
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public Integer getSerial() {
        return serial;
    }

    public void setSerial(Integer serial) {
        this.serial = serial;
    }

    public String getOsuser() {
        return osuser;
    }

    public void setOsuser(String osuser) {
        this.osuser = osuser;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public Integer getUsuario() {
        return usuario;
    }

    public void setUsuario(Integer usuario) {
        this.usuario = usuario;
    }

    public Date getEntrada() {
        return entrada;
    }

    public void setEntrada(Date entrada) {
        this.entrada = entrada;
    }

    public Date getSalida() {
        return salida;
    }

    public void setSalida(Date salida) {
        this.salida = salida;
    }

    public Integer getClave() {
        return clave;
    }

    public void setClave(Integer clave) {
        this.clave = clave;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (clave != null ? clave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liconexion)) {
            return false;
        }
        Liconexion other = (Liconexion) object;
        if ((this.clave == null && other.clave != null) || (this.clave != null && !this.clave.equals(other.clave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liconexion[clave=" + clave + "]";
    }
}
