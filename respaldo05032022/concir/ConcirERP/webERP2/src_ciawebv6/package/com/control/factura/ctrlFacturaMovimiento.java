/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.control.factura;

import com.dao.EventManager;
import com.dao.jdbc.DaoHelper;
import com.dao.util.HibernateUtil;
import com.entity.Limovalmacen;
import com.entity.Liremisiones;
import com.entity.Liusuarios;
import java.io.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.*;
import com.sql.SQLFacturas;
import com.util.*;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpSession;

/**
 *
 * @author Marco Andrade
 */
public class ctrlFacturaMovimiento extends HttpServlet {

    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=ISO-8859-1");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0L);
        PrintWriter out = response.getWriter();
        try {
            String bnd = Utilities.obtenParametro(request, "bnd");
            switch (Integer.parseInt(bnd)) {
                case 1:
                    out.print(getNoFact(request));
                    break;
                case 2:
                    out.print(getMoviAlmacPrad(request));
                    break;
                case 3:
                    out.print(getProductos(request));
                    break;
                case 4:
                    out.print(getDatsGnrlsRemision(request));
                    break;
                case 5:
                    out.print(getDetalleMvimts(request));
                    break;
            }
        } finally {
            out.close();
        }
    }

    public String getNoFact(HttpServletRequest request) {
        String json = "";
        EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
        Liusuarios usr = Utilities.ReactivarSession(request);
        if (usr != null) {
            try {
                if (!em.getTransaction().isActive()) {
                    em.getTransaction().begin();
                }
                String idProducto = Utilities.obtenParametro(request, "idProduct").replaceAll("'", "");
                String idAlmacen = Utilities.obtenParametro(request, "idalmacen").replaceAll("'", "");
                String fecha = Utilities.obtenParametro(request, "fechIni").replaceAll("'", "");
                String fechFin = Utilities.obtenParametro(request, "fechFin").replaceAll("'", "");
                DaoHelper daoHelper = new DaoHelper();
                ArrayList arraySaldo = new ArrayList(0);
                arraySaldo.clear();
                arraySaldo = daoHelper.getResultTable(SQLFacturas.getSaldoMov(usr.getUsuempresa(), idProducto, idAlmacen, fecha));
                if ((arraySaldo != null) && (!arraySaldo.isEmpty())) {
                    Hashtable hashAuxExistencia = new Hashtable();
                    hashAuxExistencia.clear();
                    hashAuxExistencia = (Hashtable) arraySaldo.get(0);
                    json = "{success:true,";
                    json += "data:{idTipAlmcenExis:'" + idAlmacen + "',idFechaIniExis:'" + fecha + "',idFechaFinExis:'" + fechFin + "'";
                    json += ",saldo:" + (String) hashAuxExistencia.get("SALDO") + "}}";
                } else {
                    json = "{success:true,data:{idTipAlmcenExis:'" + idAlmacen + "',idFechaIniExis:'" + fecha + "',idFechaFinExis:'" + fechFin + "',saldo:0}}";
                }
            } catch (Exception e) {
                e.printStackTrace();
                em.getTransaction().rollback();
                json = "{success:false,data:{saldo:0}}";
            } finally {
                HibernateUtil.closeSession();
            }
        }
        return json;
    }

    public static String getMoviAlmacPrad(HttpServletRequest request) {
        String callback = Utilities.obtenParametro(request, "callback").replaceAll("'", "");
        String record = callback + "(total:0,records:[]});";
        int saldo = 0, saloAux = 0, saloAuxs = 0, saloAuxt = 0;
        Liusuarios usr = Utilities.ReactivarSession(request);
        if (usr != null) {
            EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
            if (!em.getTransaction().isActive()) {
                em.getTransaction().begin();
            }
            try {
                List lst = null;
                ArrayList arrayMovimtos = new ArrayList(0);
                arrayMovimtos.clear();
                int start = Integer.parseInt(Utilities.obtenParametro(request, "start").equals("") ? "0" : Utilities.obtenParametro(request, "start"));
                int limit = Integer.parseInt(Utilities.obtenParametro(request, "limit").equals("") ? "0" : Utilities.obtenParametro(request, "limit"));
                String idAlmacen = Utilities.obtenParametro(request, "idAlmacen").replaceAll("'", "");
                String idProduct = Utilities.obtenParametro(request, "idProduct").replaceAll("'", "");
                String FechIni = Utilities.obtenParametro(request, "FechIni").replaceAll("'", "");
                String FechFin = Utilities.obtenParametro(request, "FechFin").replaceAll("'", "");
                DaoHelper daoHelper = new DaoHelper();
                if (!idAlmacen.equals("")) {
                    ArrayList arraySaldo = new ArrayList(0);
                    arraySaldo.clear();
                    arraySaldo = daoHelper.getResultTable(SQLFacturas.getSaldoMov(usr.getUsuempresa(), idProduct, idAlmacen, FechIni));
                    if ((arraySaldo != null) && (!arraySaldo.isEmpty())) {
                        Hashtable hashAuxSaldo = new Hashtable();
                        hashAuxSaldo.clear();
                        hashAuxSaldo = (Hashtable) arraySaldo.get(0);
                        saldo = Integer.parseInt((String) hashAuxSaldo.get("SALDO"));
                    }
                }
                if (!idAlmacen.equals("")) {
                    Vector vecParams = new Vector();
                    vecParams.clear();
                    vecParams.add(usr.getUsuempresa());
                    vecParams.add(Integer.parseInt(idAlmacen));
                    arrayMovimtos = daoHelper.getResultTable(SQLFacturas.getConMovProd(FechIni, FechFin, idProduct), vecParams);
                }
                if (arrayMovimtos != null) {
                    if (!arrayMovimtos.isEmpty()) {
                        record = callback + "({total:" + arrayMovimtos.size() + ",records:[";
                        for (int i = start; (i < start + limit) && (i < arrayMovimtos.size()); i++) {
                            Hashtable hashAuxMovimtos = new Hashtable();
                            hashAuxMovimtos.clear();
                            hashAuxMovimtos = (Hashtable) arrayMovimtos.get(i);
                            record = record + "{";
                            record = record + "elegir:\"<u><a href=# onClick=getRemAlmacen(" + (String) hashAuxMovimtos.get("DREREMISION") + ") style='color:#1CA4D7; cursor:pointer;'>Elegir</a></u> \" ,";
                            record = record + "fechaFact:'" + (String) hashAuxMovimtos.get("DREFECHA") + "',";
                            record = record + "remision:'" + (String) hashAuxMovimtos.get("DREREMISION") + "',";
                            record = record + "ubicacion:'" + (String) hashAuxMovimtos.get("DREUBICACION") + "',";
                            record = record + "referencia:'" + (String) hashAuxMovimtos.get("REMREFERENCIA") + "',";
                            record = record + "concepto:'" + (String) hashAuxMovimtos.get("MOVDESCRIPCION") + "',";
                            record = record + "cantidad:'" + (String) hashAuxMovimtos.get("DRECANTIDAD") + "',";
                            if (i == 0) {
                                saloAux = saldo + Integer.parseInt((String) hashAuxMovimtos.get("DRECANTIDAD"));
                                saloAuxt = saloAux;
                            } else {
                                saloAuxt = saloAuxt + Integer.parseInt((String) hashAuxMovimtos.get("DRECANTIDAD"));
                            }
                            record = record + "saldoProd:'" + saloAuxt + "'";
                            record = record + "},";
                        }
                        record = record.substring(0, record.length() - 1) + "]});";
                    } else {
                        record = callback + "({total:0,records:[]});";
                    }
                } else {
                    record = callback + "({total:0,records:[]});";
                }
            } catch (Exception e) {
                record = callback + "({total:0,records:[]);";
                e.printStackTrace();
                if (em.getTransaction().isActive()) {
                    em.getTransaction().rollback();
                }
            } finally {
                HibernateUtil.closeSession();
            }
        } else {
            record = callback + "({total:getSession(),records:[]});";
        }
        return record;
    }

    public String getProductos(HttpServletRequest request) {
        String callback = Utilities.obtenParametro(request, "callback").replaceAll("'", "");
        String record = callback + "({total:0,records:[]});";
        String sqlProdctLike = "";
        Liusuarios usr = Utilities.ReactivarSession(request);
        if (usr != null) {
            EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
            if (!em.getTransaction().isActive()) {
                em.getTransaction().begin();
            }
            try {
                ArrayList arrayProductos = new ArrayList(0);
                arrayProductos.clear();
                int start = Integer.parseInt(Utilities.obtenParametro(request, "start").equals("") ? "0" : Utilities.obtenParametro(request, "start"));
                int limit = Integer.parseInt(Utilities.obtenParametro(request, "limit").equals("") ? "0" : Utilities.obtenParametro(request, "limit"));
                String cvProduct = Utilities.obtenParametro(request, "cvProduct").replaceAll("'", "");
                String tipoBuq = Utilities.obtenParametro(request, "tipoBuq").replaceAll("'", "");
                if (!cvProduct.equals("")) {
                    if (tipoBuq.equals("true")) {
                        sqlProdctLike = " and prdclave like '" + cvProduct + "%' ";
                    } else if (tipoBuq.equals("false")) {
                        sqlProdctLike = " and prddescripcion like '" + cvProduct + "%' ";
                    }
                }
                DaoHelper daoHelper = new DaoHelper();
                Vector vecParams = new Vector();
                vecParams.clear();
                vecParams.add(usr.getUsuempresa());
                arrayProductos = daoHelper.getResultTable(SQLFacturas.getProductosEmpresa(sqlProdctLike), vecParams);
                if (arrayProductos != null) {
                    if (!arrayProductos.isEmpty()) {
                        record = callback + "({total:" + arrayProductos.size() + ",records:[";
                        for (int i = start; (i < start + limit) && (i < arrayProductos.size()); i++) {
                            Hashtable hashAuxProductos = new Hashtable();
                            hashAuxProductos.clear();
                            hashAuxProductos = (Hashtable) arrayProductos.get(i);
                            record = record + "{";
                            record = record + "cvProducto:'" + (String) hashAuxProductos.get("PRDCLAVE") + "',";
                            record = record + "descripcion:'" + (String) hashAuxProductos.get("PRDDESCRIPCION").toString().replaceAll("'", "") + "'";
                            record = record + "},";
                        }
                        record = record.substring(0, record.length() - 1) + "]});";
                    } else {
                        record = callback + "({total:0,records:[]});";
                    }
                } else {
                    record = callback + "({total:0,records:[]});";
                }
            } catch (Exception e) {
                record = callback + "({total:0,records:[]});";
                e.printStackTrace();
                if (em.getTransaction().isActive()) {
                    em.getTransaction().rollback();
                }
            } finally {
                HibernateUtil.closeSession();
            }
        } else {
            record = callback + "({total:0,records:[]});";
        }
        return record;

    }

    public String getDatsGnrlsRemision(HttpServletRequest request) {
        String json = "";
        EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
        Liusuarios usr = Utilities.ReactivarSession(request);
        if (usr != null) {
            try {
                if (!em.getTransaction().isActive()) {
                    em.getTransaction().begin();
                }
                String idRemision = Utilities.obtenParametro(request, "idRemision").replaceAll("'", "");
                Liremisiones ListRemisiones = (Liremisiones) EventManager.getSingleList(Liremisiones.class, Integer.parseInt(idRemision));
                if (ListRemisiones != null) {
                    json = "{success:true,";
                    json += "data:{";
                    json += "idremRemision:'" + ListRemisiones.getRemfolio() + "',"
                            + "idRemFecha:'" + (ListRemisiones.getRemfecha() == null ? "NA" : Fecha.getDateExtJSSQL(ListRemisiones.getRemfecha().toString(), "-", "/")) + "',"
                            + "idRemFolio:'" + ListRemisiones.getRemcverecibo() + "',"
                            + "idRemEmpresa:'" + ListRemisiones.getRemempresa().getEmpclave() + " " + ListRemisiones.getRemempresa().getEmpnombre() + "',"
                            + "idRemReferencia:'" + ListRemisiones.getRemreferencia() + "',"
                            + "idRemAlmacen:'" + ListRemisiones.getRemalmacen().getAlmclave() + " " + ListRemisiones.getRemalmacen().getAlmnombre() + "',";
                    Limovalmacen objMovalmacen = (Limovalmacen) EventManager.getSingleList(Limovalmacen.class, ListRemisiones.getRemtipo());
                    json += "idremTipoMov:'" + objMovalmacen.getMovclave() + " " + objMovalmacen.getMovdescripcion() + "',"
                            + "idRemComentarios:'" + (ListRemisiones.getRemcoms() == null ? "NA" : ListRemisiones.getRemcoms()) + "'}}";
                } else {
                    json = "{success:false,data:{idremRemision:'',idRemFecha:'',idRemFolio:'',idRemEmpresa:'',"
                            + "idRemReferencia:'',idRemAlmacen:'',idremTipoMov:'',idRemComentarios:''}}";
                }
            } catch (Exception e) {
                e.printStackTrace();
                em.getTransaction().rollback();
                json = "{success:false,data:{idremRemision:'',idRemFecha:'',idRemFolio:'',idRemEmpresa:'',"
                        + "idRemReferencia:'',idRemAlmacen:'',idremTipoMov:'',idRemComentarios:''}}";
            } finally {
                HibernateUtil.closeSession();
            }
        }
        return json;
    }

    public static String getDetalleMvimts(HttpServletRequest request) {
        String callback = Utilities.obtenParametro(request, "callback").replaceAll("'", ""), idRemision = "";
        String record = callback + "({total:0,records:[]});";
        Liusuarios usr = Utilities.ReactivarSession(request);
        HttpSession s = request.getSession(true);
        if (usr != null) {
            EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
            if (!em.getTransaction().isActive()) {
                em.getTransaction().begin();
            }
            try {
                ArrayList arrayRemision = new ArrayList(0);
                arrayRemision.clear();
                int start = Integer.parseInt(Utilities.obtenParametro(request, "start").equals("") ? "0" : Utilities.obtenParametro(request, "start"));
                int limit = Integer.parseInt(Utilities.obtenParametro(request, "limit").equals("") ? "0" : Utilities.obtenParametro(request, "limit"));
                idRemision = Utilities.obtenParametro(request, "idRemision").replaceAll("'", "");
                if (!idRemision.equals("")) {
                    s.removeAttribute("idRemision");
                    s.setAttribute("idRemision", idRemision);
                    idRemision = s.getAttribute("idRemision").toString();
                } else {
                    idRemision = s.getAttribute("idRemision").toString();
                }
                DaoHelper daoHelper = new DaoHelper();
                Vector vecParams = new Vector();
                vecParams.clear();
                vecParams.add(Integer.parseInt(idRemision));
                arrayRemision = daoHelper.getResultTable(SQLFacturas.getDetMovimProducts(), vecParams);
                if (arrayRemision != null) {
                    if (!arrayRemision.isEmpty()) {
                        record = callback + "({total:" + arrayRemision.size() + ",records:[";
                        for (int i = start; (i < start + limit) && (i < arrayRemision.size()); i++) {
                            Hashtable hashAuxRemision = new Hashtable();
                            hashAuxRemision.clear();
                            hashAuxRemision = (Hashtable) arrayRemision.get(i);
                            record = record + "{";
                            record = record + "productoRemi:'" + (String) hashAuxRemision.get("DREPRODUCTO") + "',";
                            record = record + "descripcionRemi:'" + (String) hashAuxRemision.get("PRDDESCRIPCION") + "',";
                            record = record + "loteRemi:'" + (String) hashAuxRemision.get("DRELOTE") + "',";
                            record = record + "fechaRemi:'" + (String) hashAuxRemision.get("DREFECFAC") + "',";
                            record = record + "ubicacionRemi:'" + (String) hashAuxRemision.get("DREUBICACION") + "',";
                            record = record + "cantidadRemi:'" + (String) hashAuxRemision.get("DRECANTIDAD") + "',";
                            record = record + "comentariosRemi:'" + (String) hashAuxRemision.get("DRECOMS") + "'";
                            record = record + "},";
                        }
                        record = record.substring(0, record.length() - 1) + "]});";
                    } else {
                        record = callback + "({total:0,records:[]});";
                    }
                } else {
                    record = callback + "({total:0,records:[]});";
                }
            } catch (Exception e) {
                record = callback + "({total:0,records:[]});";
                e.printStackTrace();
                if (em.getTransaction().isActive()) {
                    em.getTransaction().rollback();
                }
            } finally {
                HibernateUtil.closeSession();
            }
        } else {
            record = callback + "({total:0,records:[]});";
        }
        return record;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
