/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.entity;

import java.io.Serializable;
import java.math.BigDecimal;
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
 * @author Marco Andrade
 */
@Entity
@Table(name = "LICLIENTES")
public class Liclientes implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "CLICLAVE")
    private Integer cliclave;
    @Basic(optional = false)
    @Column(name = "CLINUMERO")
    private Integer clinumero;//CLINUMERO
    @Basic(optional = false)
    @Column(name = "CLINOMBRE")
    private String clinombre;
    @Column(name = "CLIDIRECCION")
    private String clidireccion;
    @Basic(optional = false)
    @Column(name = "CLIPOB")
    private Integer clipob;//CLIPOB
    @Column(name = "CLICP")
    private String clicp;
    @Column(name = "CLITELEFONO")
    private String clitelefono;
    @Basic(optional = false)
    @Column(name = "CLITIPO")
    private String clitipo;
    @Column(name = "CLIZONA")
    private Integer clizona;//CLIZONA
    @Column(name = "CLICOMS")
    private String clicoms;
    @Column(name = "CLICLASIFICACION")
    private String cliclasificacion;
    @Column(name = "CLIDIRECCION2")
    private String clidireccion2;
    @Column(name = "CLIDIRECCION3")
    private String clidireccion3;
    @Column(name = "CLIPAIS")
    private String clipais;
    @Column(name = "CLIDIRECENT1")
    private String clidirecent1;
    @Column(name = "CLIDIRECENT2")
    private String clidirecent2;
    @Column(name = "CLIDIRECENT3")
    private String clidirecent3;
    @Column(name = "CLITELEFONO2")
    private String clitelefono2;
    @Column(name = "CLIRFC")
    private String clirfc;
    @Column(name = "CLICURP")
    private String clicurp;
    @Column(name = "CLITIPOPAGO")
    private Integer clitipopago;//CLITIPOPAGO
    @Column(name = "CLICONDVENTA")
    private String clicondventa;
    @Column(name = "CLIDIASCREDITO")
    private Integer clidiascredito;//CLIDIASCREDITO
    @Column(name = "CLIESCALA")
    private Integer cliescala;//CLIESCALA
    @Column(name = "CLIDIAREVISION")
    private String clidiarevision;
    @Column(name = "CLIDIAPAGO")
    private String clidiapago;
    @Column(name = "CLILIMITECREDITO")
    private Double clilimitecredito;//CLILIMITECREDITO--
    @Column(name = "CLIREGION")
    private String cliregion;
    @Column(name = "CLIAGENTE")
    private String cliagente;
    @Column(name = "CLIESTATUS")
    private String cliestatus;
    @Column(name = "CLISUCURSAL")
    private String clisucursal;
    @Column(name = "CLIDESCCOMER")
    private Double clidesccomer;//CLIDESCCOMER--
    @Column(name = "CLIDESCPP")
    private Double clidescpp;//CLIDESCPP--
    @Column(name = "CLIDESCOTRO")
    private Double clidescotro;//CLIDESCOTRO--
    @Column(name = "CLIRAZON")
    private String clirazon;
    @Column(name = "CLIAPLICAR")
    private Integer cliaplicar;//CLIAPLICAR
    @Column(name = "CLICVEEXTERNA")
    private String clicveexterna;
    @Basic(optional = false)
    @Column(name = "CLINACIONAL")
    private String clinacional;
    @Column(name = "CLINUMEXT")
    private String clinumext;
    @Column(name = "CLINUMINT")
    private String clinumint;
    @Column(name = "CLILOCALIDAD")
    private String clilocalidad;
    @Column(name = "CLIESTADO")
    private String cliestado;
    @JoinColumn(name = "CLICADENA", referencedColumnName = "CADCLAVE")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Licadenas clicadena;
    @JoinColumn(name = "CLIEMPRESA", referencedColumnName = "EMPCLAVE")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Liempresas cliempresa;

    public Liclientes() {
    }

    public Liclientes(Integer cliclave) {
        this.cliclave = cliclave;
    }

    public Liclientes(Integer cliclave, Integer clinumero, String clinombre, Integer clipob, String clitipo, String clinacional) {
        this.cliclave = cliclave;
        this.clinumero = clinumero;
        this.clinombre = clinombre;
        this.clipob = clipob;
        this.clitipo = clitipo;
        this.clinacional = clinacional;
    }

    public Integer getCliclave() {
        return cliclave;
    }

    public void setCliclave(Integer cliclave) {
        this.cliclave = cliclave;
    }

    public Integer getClinumero() {
        return clinumero;
    }

    public void setClinumero(Integer clinumero) {
        this.clinumero = clinumero;
    }

    public String getClinombre() {
        return clinombre;
    }

    public void setClinombre(String clinombre) {
        this.clinombre = clinombre;
    }

    public String getClidireccion() {
        return clidireccion;
    }

    public void setClidireccion(String clidireccion) {
        this.clidireccion = clidireccion;
    }

    public Integer getClipob() {
        return clipob;
    }

    public void setClipob(Integer clipob) {
        this.clipob = clipob;
    }

    public String getClicp() {
        return clicp;
    }

    public void setClicp(String clicp) {
        this.clicp = clicp;
    }

    public String getClitelefono() {
        return clitelefono;
    }

    public void setClitelefono(String clitelefono) {
        this.clitelefono = clitelefono;
    }

    public String getClitipo() {
        return clitipo;
    }

    public void setClitipo(String clitipo) {
        this.clitipo = clitipo;
    }

    public Integer getClizona() {
        return clizona;
    }

    public void setClizona(Integer clizona) {
        this.clizona = clizona;
    }

    public String getClicoms() {
        return clicoms;
    }

    public void setClicoms(String clicoms) {
        this.clicoms = clicoms;
    }

    public String getCliclasificacion() {
        return cliclasificacion;
    }

    public void setCliclasificacion(String cliclasificacion) {
        this.cliclasificacion = cliclasificacion;
    }

    public String getClidireccion2() {
        return clidireccion2;
    }

    public void setClidireccion2(String clidireccion2) {
        this.clidireccion2 = clidireccion2;
    }

    public String getClidireccion3() {
        return clidireccion3;
    }

    public void setClidireccion3(String clidireccion3) {
        this.clidireccion3 = clidireccion3;
    }

    public String getClipais() {
        return clipais;
    }

    public void setClipais(String clipais) {
        this.clipais = clipais;
    }

    public String getClidirecent1() {
        return clidirecent1;
    }

    public void setClidirecent1(String clidirecent1) {
        this.clidirecent1 = clidirecent1;
    }

    public String getClidirecent2() {
        return clidirecent2;
    }

    public void setClidirecent2(String clidirecent2) {
        this.clidirecent2 = clidirecent2;
    }

    public String getClidirecent3() {
        return clidirecent3;
    }

    public void setClidirecent3(String clidirecent3) {
        this.clidirecent3 = clidirecent3;
    }

    public String getClitelefono2() {
        return clitelefono2;
    }

    public void setClitelefono2(String clitelefono2) {
        this.clitelefono2 = clitelefono2;
    }

    public String getClirfc() {
        return clirfc;
    }

    public void setClirfc(String clirfc) {
        this.clirfc = clirfc;
    }

    public String getClicurp() {
        return clicurp;
    }

    public void setClicurp(String clicurp) {
        this.clicurp = clicurp;
    }

    public Integer getClitipopago() {
        return clitipopago;
    }

    public void setClitipopago(Integer clitipopago) {
        this.clitipopago = clitipopago;
    }

    public String getClicondventa() {
        return clicondventa;
    }

    public void setClicondventa(String clicondventa) {
        this.clicondventa = clicondventa;
    }

    public Integer getClidiascredito() {
        return clidiascredito;
    }

    public void setClidiascredito(Integer clidiascredito) {
        this.clidiascredito = clidiascredito;
    }

    public Integer getCliescala() {
        return cliescala;
    }

    public void setCliescala(Integer cliescala) {
        this.cliescala = cliescala;
    }

    public String getClidiarevision() {
        return clidiarevision;
    }

    public void setClidiarevision(String clidiarevision) {
        this.clidiarevision = clidiarevision;
    }

    public String getClidiapago() {
        return clidiapago;
    }

    public void setClidiapago(String clidiapago) {
        this.clidiapago = clidiapago;
    }

    public double getClilimitecredito() {
        return clilimitecredito;
    }

    public void setClilimitecredito(double clilimitecredito) {
        this.clilimitecredito = clilimitecredito;
    }

    public String getCliregion() {
        return cliregion;
    }

    public void setCliregion(String cliregion) {
        this.cliregion = cliregion;
    }

    public String getCliagente() {
        return cliagente;
    }

    public void setCliagente(String cliagente) {
        this.cliagente = cliagente;
    }

    public String getCliestatus() {
        return cliestatus;
    }

    public void setCliestatus(String cliestatus) {
        this.cliestatus = cliestatus;
    }

    public String getClisucursal() {
        return clisucursal;
    }

    public void setClisucursal(String clisucursal) {
        this.clisucursal = clisucursal;
    }

    public Double getClidesccomer() {
        return clidesccomer;
    }

    public void setClidesccomer(Double clidesccomer) {
        this.clidesccomer = clidesccomer;
    }

    public Double getClidescpp() {
        return clidescpp;
    }

    public void setClidescpp(Double clidescpp) {
        this.clidescpp = clidescpp;
    }

    public Double getClidescotro() {
        return clidescotro;
    }

    public void setClidescotro(Double clidescotro) {
        this.clidescotro = clidescotro;
    }

    public String getClirazon() {
        return clirazon;
    }

    public void setClirazon(String clirazon) {
        this.clirazon = clirazon;
    }

    public Integer getCliaplicar() {
        return cliaplicar;
    }

    public void setCliaplicar(Integer cliaplicar) {
        this.cliaplicar = cliaplicar;
    }

    public String getClicveexterna() {
        return clicveexterna;
    }

    public void setClicveexterna(String clicveexterna) {
        this.clicveexterna = clicveexterna;
    }

    public String getClinacional() {
        return clinacional;
    }

    public void setClinacional(String clinacional) {
        this.clinacional = clinacional;
    }

    public String getClinumext() {
        return clinumext;
    }

    public void setClinumext(String clinumext) {
        this.clinumext = clinumext;
    }

    public String getClinumint() {
        return clinumint;
    }

    public void setClinumint(String clinumint) {
        this.clinumint = clinumint;
    }

    public String getClilocalidad() {
        return clilocalidad;
    }

    public void setClilocalidad(String clilocalidad) {
        this.clilocalidad = clilocalidad;
    }

    public String getCliestado() {
        return cliestado;
    }

    public void setCliestado(String cliestado) {
        this.cliestado = cliestado;
    }

    public Licadenas getClicadena() {
        return clicadena;
    }

    public void setClicadena(Licadenas clicadena) {
        this.clicadena = clicadena;
    }

    public Liempresas getCliempresa() {
        return cliempresa;
    }

    public void setCliempresa(Liempresas cliempresa) {
        this.cliempresa = cliempresa;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cliclave != null ? cliclave.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liclientes)) {
            return false;
        }
        Liclientes other = (Liclientes) object;
        if ((this.cliclave == null && other.cliclave != null) || (this.cliclave != null && !this.cliclave.equals(other.cliclave))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.entity.Liclientes[cliclave=" + cliclave + "]";
    }

}
