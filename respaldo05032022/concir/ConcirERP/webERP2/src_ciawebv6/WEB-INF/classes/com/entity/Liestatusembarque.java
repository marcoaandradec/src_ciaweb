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
 * @author Sistemas
 */
@Entity
@Table(name = "LIESTATUSEMBARQUE")
public class Liestatusembarque implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "LEEIDESTATUS")
    private Integer leeidestatus;
    @Column(name = "LEENOMESTATUS")
    private String leenomestatus;
    @Column(name = "LEECVESTATUS")
    private String leecvestatus;
    @Column(name = "LEEHABILITADO")
    private Integer leehabilitado;

    public Liestatusembarque() {
    }

    public Liestatusembarque(Integer leeidestatus) {
        this.leeidestatus = leeidestatus;
    }

    public Integer getLeeidestatus() {
        return leeidestatus;
    }

    public void setLeeidestatus(Integer leeidestatus) {
        this.leeidestatus = leeidestatus;
    }

    public String getLeenomestatus() {
        return leenomestatus;
    }

    public void setLeenomestatus(String leenomestatus) {
        this.leenomestatus = leenomestatus;
    }

    public String getLeecvestatus() {
        return leecvestatus;
    }

    public void setLeecvestatus(String leecvestatus) {
        this.leecvestatus = leecvestatus;
    }

    public Integer getLeehabilitado() {
        return leehabilitado;
    }

    public void setLeehabilitado(Integer leehabilitado) {
        this.leehabilitado = leehabilitado;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (leeidestatus != null ? leeidestatus.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liestatusembarque)) {
            return false;
        }
        Liestatusembarque other = (Liestatusembarque) object;
        if ((this.leeidestatus == null && other.leeidestatus != null) || (this.leeidestatus != null && !this.leeidestatus.equals(other.leeidestatus))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liestatusembarque[leeidestatus=" + leeidestatus + "]";
    }

}
