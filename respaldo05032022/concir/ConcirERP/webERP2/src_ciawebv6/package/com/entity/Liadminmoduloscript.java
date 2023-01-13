/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
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

/**
 *
 * @author marco
 */
@Entity
@Table(name = "LIADMINMODULOSCRIPT")

public class Liadminmoduloscript implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "AMSIDMODULOSCRIPT")
    private Integer amsidmoduloscript;
    @Column(name = "AMSSCRIPT")
    private String amsscript;
    @JoinColumn(name = "AMSIDMODULO", referencedColumnName = "AMIDMODULO")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Liadminmodulo amsidmodulo;

    public Liadminmoduloscript() {
    }

    public Liadminmoduloscript(Integer amsidmoduloscript) {
        this.amsidmoduloscript = amsidmoduloscript;
    }

    public Integer getAmsidmoduloscript() {
        return amsidmoduloscript;
    }

    public void setAmsidmoduloscript(Integer amsidmoduloscript) {
        this.amsidmoduloscript = amsidmoduloscript;
    }

    public String getAmsscript() {
        return amsscript;
    }

    public void setAmsscript(String amsscript) {
        this.amsscript = amsscript;
    }

    public Liadminmodulo getAmsidmodulo() {
        return amsidmodulo;
    }

    public void setAmsidmodulo(Liadminmodulo amsidmodulo) {
        this.amsidmodulo = amsidmodulo;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (amsidmoduloscript != null ? amsidmoduloscript.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liadminmoduloscript)) {
            return false;
        }
        Liadminmoduloscript other = (Liadminmoduloscript) object;
        if ((this.amsidmoduloscript == null && other.amsidmoduloscript != null) || (this.amsidmoduloscript != null && !this.amsidmoduloscript.equals(other.amsidmoduloscript))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liadminmoduloscript[amsidmoduloscript=" + amsidmoduloscript + "]";
    }

}
