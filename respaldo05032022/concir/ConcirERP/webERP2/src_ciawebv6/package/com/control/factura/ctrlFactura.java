/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.control.factura;

import com.dao.EventManager;
import com.dao.jdbc.DaoHelper;
import com.dao.util.HibernateUtil;
import com.entity.Lialmacenes;
import com.entity.Liembarques;
import com.entity.Liusuarios;
import com.sql.SQLFacturas;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.persistence.EntityManager;
import java.io.*;
import java.util.*;
import com.util.*;
import jakarta.servlet.http.HttpSession;

/**
 *
 * @author Marco Andrade
 */
public class ctrlFactura extends HttpServlet {

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
                    out.print(getFactura(request));
                    break;
                case 2:
                    out.print(buscarFactura(request));
                    //out.print(buscarFacturaSPg(request));
                    break;
                case 3:
                    out.print(buscarExistencia(request));
                    break;
                case 4:
                    out.print(buscarFacturas(request));
                    break;
                case 5:
                    out.println(getNoFact(request));
                    break;
                case 6:
                    out.println(Utilities.getGridRemoveColum(request));
                    break;
            }
        } finally {
            out.close();
        }
    }

    public String getFactura(HttpServletRequest request) {
        String respuesta = "", motivo = "", chofer = "", sqlBusq = "";
        Liusuarios usr = Utilities.ReactivarSession(request);
        if (usr != null) {
            javax.persistence.EntityManager em = HibernateUtil.getEntityManager();
            if (!em.getTransaction().isActive()) {
                em.getTransaction().begin();
            }
            try {
                String noFactura = Utilities.obtenParametro(request, "idCnt");
                String bndFact = Utilities.obtenParametro(request, "bndFact");
                Vector vecParams = new Vector();
                vecParams.clear();
                vecParams.add(usr.getUsuempresa());
                if (bndFact.equals("")) {
                    sqlBusq = " and (le.embfolio=" + noFactura + ")";
                } else {
                    if (bndFact.equals("true")) {
                        sqlBusq = " and (le.embfolio=" + noFactura + ")";
                    } else if (bndFact.equals("false")) {
                        sqlBusq = " and (le.embref='" + noFactura + "')";
                    } else if (bndFact.equals("Factura")) {
                        sqlBusq = " and (le.embclave=" + noFactura + ")";
                    }
                }
                List listFactura = EventManager.getArrayParameter(SQLFacturas.obtFactura(sqlBusq), vecParams);
                if ((listFactura != null) && (!listFactura.isEmpty())) {
                    Object[] obj = (Object[]) (Object[]) listFactura.get(0);
                    respuesta = "{success:true,data:{"
                            + "fchfactura:'" + (obj[0] == null ? "NA" : Fecha.getDateExtJSSQL(obj[0].toString(), "-", "/")) + "',"
                            + "fchpedido:'" + (obj[1] == null ? "NA" : Fecha.getDateExtJSSQL(obj[1].toString(), "-", "/")) + "',"
                            + "factura:'" + (obj[28] == null ? "NA" : obj[28]) + "',"
                            + "referencia:'" + (obj[2] == null ? "NA" : obj[2]) + "',"
                            + "noenvio:'" + (obj[3] == null ? "NA" : obj[3]) + "',"
                            + "nocliente:'" + (obj[4] == null ? "NA" : obj[4]) + " " + (obj[5] == null ? "NA" : (String) obj[5].toString().replaceAll("'", "")) + "',"
                            + "destino:'" + (obj[6] == null ? "NA" : obj[6]) + " " + (obj[7] == null ? "NA" : (String) obj[7].toString().replaceAll("'", "")) + "',"
                            + "nocajas:'" + (obj[8] == null ? "NA" : obj[8]) + "',"
                            + "kilos:'" + (obj[9] == null ? "NA" : obj[9]) + "',"
                            + "importe:'" + (obj[10] == null ? "NA" : obj[10]) + "',"
                            + "Comentarios:'" + (obj[11] == null ? "NA" : obj[11].toString().replaceAll("'", "")) + "',"
                            + "folentrada:'" + (obj[12] == null ? "NA" : obj[12]) + "',"
                            + "fchrecibo:'" + (obj[13] == null ? "NA" : Fecha.getDateExtJSSQL(obj[13].toString(), "-", "/")) + "',"
                            + "guiaempr:'" + (obj[14] == null ? "NA" : obj[14]) + "',"
                            + "ubicacion:'" + (obj[15] == null ? "NA" : obj[15]) + "',"
                            + "entregar:'" + (obj[16] == null ? "NA" : Fecha.getDateExtJSSQL(obj[16].toString(), "-", "/")) + "',"
                            + "fechcancel:'" + (obj[17] == null ? "NA" : Fecha.getDateExtJSSQL(obj[17].toString(), "-", "/")) + "',"
                            + "folembarque:'" + (obj[18] == null ? "NA" : obj[18]) + "',"
                            + "fchembarque:'" + (obj[19] == null ? "NA" : Fecha.getDateExtJSSQL(obj[19].toString(), "-", "/")) + "',";
                    if (obj[24] != null) {
                        Liembarques objEmbarque = (Liembarques) EventManager.getSingleList(Liembarques.class, Integer.parseInt(obj[24].toString()));
                        if (objEmbarque.getEmbchofer() != null) {
                            chofer = objEmbarque.getEmbchofer().getChoclave() + " " + objEmbarque.getEmbchofer().getChonombre() + " " + objEmbarque.getEmbchofer().getChopaterno() + " " + objEmbarque.getEmbchofer().getChomaterno();
                        } else {
                            chofer = "NA";
                        }
                    }
                    respuesta = respuesta + "nombchofer:'" + chofer + "',"
                            + "folentrega:'" + (obj[20] == null ? "NA" : obj[20]) + "',"
                            + "piezas:'" + (obj[21] == null ? "NA" : obj[21]) + "',"
                            + "ar:'" + (obj[22] == null ? "NA" : Fecha.getDateExtJSSQL(obj[22].toString(), "-", "/")) + "',";
                    respuesta = respuesta + "tiprechazo:'" + (obj[23] == null ? "NA" : obj[23].toString().equals("O") ? "Otro" : obj[23].toString().equals("P") == true ? "Rechazo Parcial" : obj[23].toString().equals("T") ? "Rechazo Total" : "NA") + "',";
                    if (obj[24] != null) {
                        Liembarques objEmbarque = (Liembarques) EventManager.getSingleList(Liembarques.class, Integer.parseInt(obj[24].toString()));
                        if (objEmbarque.getEmbconcrechazo() != null) {
                            motivo = objEmbarque.getEmbconcrechazo().getMredescripcion();
                        } else {
                            motivo = "NA";
                        }
                    }
                    respuesta = respuesta + "motivo:'" + (obj[24] == null ? "NA" : motivo) + "',";
                    respuesta = respuesta + "accion:'" + (obj[25] == null ? "NA" : getAccion(obj[25].toString())) + "',";
                    respuesta = respuesta + "foldevdocs:'" + (obj[26] == null ? "NA" : obj[26]) + "',";
                    respuesta = respuesta + "fchdevdocs:'" + (obj[27] == null ? "NA" : Fecha.getDateExtJSSQL(obj[27].toString(), "-", "/")) + "'";
                    respuesta += "}}";
                } else {
                    respuesta = "{success: false,msg: 'No Existe la Factura',accion1:'false',wnd:'idTabFactura'}";
                }
            } catch (Exception e) {
                e.printStackTrace();
                em.getTransaction().rollback();
                respuesta = "{success: false,msg: 'Error en el servidor',accion1:'false',wnd:'idTabFactura'}";
            } finally {
                HibernateUtil.closeSession();
            }
        }
        return respuesta;
    }

    private String buscarFactura(HttpServletRequest request) {
        String callback = Utilities.obtenParametro(request, "callback").replaceAll("'", "");
        String record = callback + "({total:0,records:[]});";
        String query1 = "", query2 = "", query3 = "", fechaIni = "", fechaFin = "", tipoCliente = "", IdStatus = "", ordernBy = "", dir = "";
        Liusuarios usr = Utilities.ReactivarSession(request);
        HttpSession s = request.getSession(true);
        if (usr != null) {
            EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
            if (!em.getTransaction().isActive()) {
                em.getTransaction().begin();
            }
            try {
                ArrayList arrayFacturas = new ArrayList(0);
                arrayFacturas.clear();
                DaoHelper daoHelper = new DaoHelper();
                if (!Utilities.obtenParametro(request, "busqBnd").equals("")) {
                    s.removeAttribute("fechaIni");
                    s.removeAttribute("fechaFin");
                    s.removeAttribute("tipoCliente");
                    s.removeAttribute("IdStatus");
                    fechaIni = Utilities.obtenParametro(request, "fechaIni").replaceAll("'", "");
                    fechaFin = Utilities.obtenParametro(request, "fechaFin").replaceAll("'", "");
                    tipoCliente = Utilities.obtenParametro(request, "tipoCliente").replaceAll("'", "");
                    IdStatus = Utilities.obtenParametro(request, "idestatus").replaceAll("'", "");
                    s.setAttribute("fechaIni", fechaIni);
                    s.setAttribute("fechaFin", fechaFin);
                    s.setAttribute("tipoCliente", tipoCliente);
                    s.setAttribute("IdStatus", IdStatus);
                } else {
                    fechaIni = (s.getAttribute("fechaIni") != null ? s.getAttribute("fechaIni").toString() : "");
                    fechaFin = (s.getAttribute("fechaFin") != null ? s.getAttribute("fechaFin").toString() : "");
                    tipoCliente = (s.getAttribute("tipoCliente") != null ? s.getAttribute("tipoCliente").toString() : "");
                    IdStatus = (s.getAttribute("IdStatus") != null ? s.getAttribute("IdStatus").toString() : "");
                }
                ordernBy = Utilities.obtenParametro(request, "sort");
                dir = Utilities.obtenParametro(request, "dir");
                int start = Integer.parseInt(Utilities.obtenParametro(request, "start").equals("") ? "0" : Utilities.obtenParametro(request, "start"));
                int limit = Integer.parseInt(Utilities.obtenParametro(request, "limit").equals("") ? "0" : Utilities.obtenParametro(request, "limit"));

                if (!fechaIni.equals("") && !fechaFin.equals("")) {
                    query1 = " and (trunc(le.embfechafac) between trunc(to_date('" + fechaIni + "')) and trunc(to_date('" + fechaFin + "'))) ";
                    if (!tipoCliente.equals("")) {
                        query2 = " and lc.clitipo='" + tipoCliente + "' ";
                    }
                    if (!IdStatus.equals("")) {
                        query3 = this.getSqlStatus(IdStatus);
                    }
                    arrayFacturas = daoHelper.getResultTable(SQLFacturas.BuscarFacturas(query1, query2, query3, usr.getUsuempresa(),CtrlUtilFactura.getOrdSqlBusFac(ordernBy, dir)));
                }
                //lst = EventManager.getArray(SQLFacturas.BuscarFacturas(query1, query2, query3, usr.getUsuempresa()));
                if (arrayFacturas != null) {
                    if (!arrayFacturas.isEmpty()) {
                        record = callback + "({total:" + arrayFacturas.size() + ",records:[";
                        for (int i = start; (i < start + limit) && (i < arrayFacturas.size()); i++) {
                            //Object[] obj = (Object[]) (Object[]) lst.get(i);
                            Hashtable hashAuxFactura = new Hashtable();
                            hashAuxFactura.clear();
                            hashAuxFactura = (Hashtable) arrayFacturas.get(i);
                            record = record + "{";
                            record = record + "elegir:\"<u><a href=# onClick=getDetalleFact(" + hashAuxFactura.get("EMBCLAVE") + ",'Factura') style='color:#1CA4D7; cursor:pointer;'>Elegir</a></u> \" ,";
                            record = record + "estatus:'" + this.status((hashAuxFactura.get("EMBESTATUS").equals("") ? null : (String) hashAuxFactura.get("EMBESTATUS")), (hashAuxFactura.get("EMBTIPORECHAZO").equals("") ? null : (String) hashAuxFactura.get("EMBTIPORECHAZO")), (hashAuxFactura.get("EMBFECENTREGA").equals("") ? null : (String) hashAuxFactura.get("EMBFECENTREGA"))) + "',";
                            record = record + "factura:'" + (hashAuxFactura.get("EMBFOLIO").equals("") ? "NA" : hashAuxFactura.get("EMBFOLIO")) + "',";
                            record = record + "referencia:'" + (hashAuxFactura.get("EMBREF").equals("") ? "NA" : hashAuxFactura.get("EMBREF")) + "',";
                            record = record + "envio:'" + (hashAuxFactura.get("EMBENVIO").equals("") ? "NA" : hashAuxFactura.get("EMBENVIO")) + "',";
                            record = record + "numCliente:'" + (hashAuxFactura.get("EMBCLIENTE").equals("") ? "NA" : hashAuxFactura.get("EMBCLIENTE")) + "',";
                            record = record + "nombCliente:'" + (hashAuxFactura.get("CLINOMBRE").equals("") ? "NA" : (String) hashAuxFactura.get("CLINOMBRE").toString().replaceAll("'", "")) + "',";
                            record = record + "destino:'" + (hashAuxFactura.get("POBNOMBRE").equals("") ? "NA" : hashAuxFactura.get("POBNOMBRE")) + "',";
                            record = record + "numCajas:'" + (hashAuxFactura.get("EMBCAJAS").equals("") ? "NA" : hashAuxFactura.get("EMBCAJAS")) + "',";
                            record = record + "importe:'" + (hashAuxFactura.get("EMBVALOR").equals("") ? "NA" : hashAuxFactura.get("EMBVALOR")) + "',";
                            record = record + "fechFactura:'" + (hashAuxFactura.get("EMBFECHAFAC").equals("") ? "NA" : (String) hashAuxFactura.get("EMBFECHAFAC")) + "',";
                            record = record + "fechIngreso:'" + (hashAuxFactura.get("EMBFECHAREC").equals("") ? "NA" : (String) hashAuxFactura.get("EMBFECHAREC")) + "',";
                            record = record + "cita:'" + (hashAuxFactura.get("EMBFECHAPROG").equals("") ? "NA" : (String) hashAuxFactura.get("EMBFECHAPROG")) + "',";
                            record = record + "fechEmbarq:'" + (hashAuxFactura.get("EMBFECEMBARQUE").equals("") ? "NA" : (String) hashAuxFactura.get("EMBFECEMBARQUE")) + "',";
                            record = record + "fechEntreg:'" + (hashAuxFactura.get("EMBFECENTREGA").equals("") ? "NA" : (String) hashAuxFactura.get("EMBFECENTREGA")) + "',";
                            record = record + "comentarios:'" + (hashAuxFactura.get("EMBCOMS").equals("") ? "NA" : (String) hashAuxFactura.get("EMBCOMS").toString().replaceAll("'", "")) + "'";
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
                record = callback + "{total:0,records:[{}]}";
                e.printStackTrace();
                if (em.getTransaction().isActive()) {
                    em.getTransaction().rollback();
                }
            } finally {
                HibernateUtil.closeSession();
            }
        } else {
            record = callback + "{total:0,records:[{}]}";
        }
        return record;
    }

    private String buscarExistencia(HttpServletRequest request) {
        String callback = Utilities.obtenParametro(request, "callback").replaceAll("'", "");
        String record = callback + "({total:0,records:[]});";
        Liusuarios usr = Utilities.ReactivarSession(request);
        HttpSession s = request.getSession(true);
        if (usr != null) {
            EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
            if (!em.getTransaction().isActive()) {
                em.getTransaction().begin();
            }
            try {
                // List lst = null;
                String idProducts = "", idAlmacen = "", nomAlmacen = "", orderBy = "", dir = "";
                ArrayList arrayExistencia = new ArrayList(0);
                arrayExistencia.clear();
                orderBy = Utilities.obtenParametro(request, "sort");
                dir = Utilities.obtenParametro(request, "dir");
                int start = Integer.parseInt(Utilities.obtenParametro(request, "start").equals("") ? "0" : Utilities.obtenParametro(request, "start"));
                int limit = Integer.parseInt(Utilities.obtenParametro(request, "limit").equals("") ? "0" : Utilities.obtenParametro(request, "limit"));
                DaoHelper daoHelper = new DaoHelper();
                Vector vecParams = new Vector();
                vecParams.clear();
                if (!Utilities.obtenParametro(request, "busqBnd").equals("")) {
                    s.removeAttribute("idProducts");
                    s.removeAttribute("idAlmacen");
                    idProducts = Utilities.obtenParametro(request, "idProducts").replaceAll("'", "");
                    idAlmacen = idAlmacen = Utilities.obtenParametro(request, "idAlmacen").replaceAll("'", "");
                    s.setAttribute("idProducts", idProducts);
                    s.setAttribute("idAlmacen", idAlmacen);
                } else {
                    idProducts = (s.getAttribute("idProducts") != null ? s.getAttribute("idProducts").toString() : "");
                    idAlmacen = (s.getAttribute("idAlmacen") != null ? s.getAttribute("idAlmacen").toString() : "");
                }
                if (!idAlmacen.equals("")) {
                    vecParams.add(usr.getUsuempresa());
                    vecParams.add(Integer.parseInt(idAlmacen));
                    if (!idProducts.equals("")) {
                        idProducts = " and lp.prdclave like '" + idProducts + "%' ";
                    }
                    arrayExistencia = daoHelper.getResultTable(SQLFacturas.BuscarExistencias(idProducts, CtrlUtilFactura.getOrdSqlBusExis(orderBy, dir)), vecParams);
                }
                //  lst = EventManager.getArrayParameter(SQLFacturas.BuscarExistencias(), vecParams);
                if (arrayExistencia != null) {
                    if (!arrayExistencia.isEmpty()) {
                        record = callback + "({total:" + arrayExistencia.size() + ",records:[";
                        for (int i = start; (i < start + limit) && (i < arrayExistencia.size()); i++) {
                            Hashtable hashAuxExistencia = new Hashtable();
                            hashAuxExistencia.clear();
                            hashAuxExistencia = (Hashtable) arrayExistencia.get(i);
                            //Object[] obj = (Object[]) (Object[]) lst.get(i);
                            record = record + "{";
                            record = record + "elegir:\"<u><a href=# onClick=getConsMovimientos(Ext.getCmp('gridBuscadorExistencias').getSelectionModel().getLastSelected().get('clvProducto')," + hashAuxExistencia.get("INVALMACEN") + ",Ext.getCmp('gridBuscadorExistencias').getSelectionModel().getLastSelected().get('decripcion')) style='color:#1CA4D7; cursor:pointer;'>Elegir</a></u> \" ,";
                            record = record + "clvProducto:'" + (String) hashAuxExistencia.get("PRDCLAVE") + "',";
                            record = record + "decripcion:'" + (String) hashAuxExistencia.get("PRDDESCRIPCION").toString().replaceAll("'", "") + "',";
                            record = record + "linea:'" + (String) hashAuxExistencia.get("PRDLINEA") + "',";
                            record = record + "familia:'" + (String) hashAuxExistencia.get("PRDFAMILIA") + "',";
                            record = record + "uniAlmacenado:'" + (String) hashAuxExistencia.get("PRDUNIDAD") + "',";
                            record = record + "existReal:'" + (String) hashAuxExistencia.get("INVREAL") + "',";
                            record = record + "existReservada:'" + (String) hashAuxExistencia.get("INVRESEVADO") + "',";
                            record = record + "existDisponible:'" + this.calExDisponible((hashAuxExistencia.get("INVREAL") != null ? (String) hashAuxExistencia.get("INVREAL") : "0"), (hashAuxExistencia.get("INVRESEVADO") != null ? (String) hashAuxExistencia.get("INVRESEVADO") : "0")) + "',";
                            if (!hashAuxExistencia.get("INVALMACEN").equals("NA")) {
                                Lialmacenes objAlmacen = (Lialmacenes) EventManager.getSingleList(Lialmacenes.class, Integer.parseInt(hashAuxExistencia.get("INVALMACEN").toString()));
                                if (objAlmacen.getAlmnombre() != null) {
                                    nomAlmacen = objAlmacen.getAlmnombre();
                                } else {
                                    nomAlmacen = "NA";
                                }
                            }
                            record = record + "almacen:'" + nomAlmacen + "'";
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

    public String buscarFacturas(HttpServletRequest request) {
        //String callback = Utilities.obtenParametro(request, "callback").replaceAll("'", "");
        String record = "", sqlBusq = "";
        javax.persistence.EntityManager em = HibernateUtil.getEntityManager();
        Liusuarios usr = Utilities.ReactivarSession(request);
        DaoHelper daoHelper = new DaoHelper();
        ArrayList arrayExistencia = new ArrayList(0);
        arrayExistencia.clear();
        if (usr != null) {
            try {
                if (!em.getTransaction().isActive()) {
                    em.getTransaction().begin();
                }
                String noFactura = Utilities.obtenParametro(request, "idFact");
                String bndFact = Utilities.obtenParametro(request, "bndFact");

                Vector vecParams = new Vector();
                vecParams.clear();
                vecParams.add(usr.getUsuempresa());
                if (bndFact.equals("true")) {
                    sqlBusq = " (le.embfolio=" + noFactura + ")";
                } else if (bndFact.equals("false")) {
                    sqlBusq = " (le.embref='" + noFactura + "')";
                }
                //List listFactura = EventManager.getArrayParameter(SQLFacturas.ObtenerFacturas(sqlBusq), vecParams);
                arrayExistencia = daoHelper.getResultTable(SQLFacturas.ObtenerFacturas(sqlBusq), vecParams);
                if ((arrayExistencia != null) && (!arrayExistencia.isEmpty())) {
                    record = "{records:[";
                    for (int i = 0; i < arrayExistencia.size(); i++) {
                        //Object[] obj = (Object[]) (Object[]) listFactura.get(i);
                        Hashtable hashAuxExistencia = new Hashtable();
                        hashAuxExistencia.clear();
                        hashAuxExistencia = (Hashtable) arrayExistencia.get(i);
                        record = record + "{";
                        record = record + "elegir:\"<u><a href=# onClick=getDetalleFact(" + hashAuxExistencia.get("EMBCLAVE") + ",'Factura') style='color:#1CA4D7; cursor:pointer;'>Elegir</a></u> \" ,";
                        record = record + "numFactura:'" + (String) hashAuxExistencia.get("EMBFOLIO") + "',";
                        record = record + "fechFactura:'" + (String) hashAuxExistencia.get("EMBFECHAFAC") + "',";
                        record = record + "numEnvio:'" + (String) hashAuxExistencia.get("EMBENVIO") + "'";
                        record = record + "},";
                    }
                    record = record.substring(0, record.length() - 1) + "]}";
                } else {
                    record = "{records:[]}";
                }
            } catch (Exception e) {
                e.printStackTrace();
                em.getTransaction().rollback();
                record = record = "{records:[]}";
            } finally {
                HibernateUtil.closeSession();
            }
        }
        return record;
    }

    public String getNoFact(HttpServletRequest request) {
        String json = "", sqlBusq = "";
        javax.persistence.EntityManager em = HibernateUtil.getEntityManager();
        Liusuarios usr = Utilities.ReactivarSession(request);
        if (usr != null) {
            try {
                if (!em.getTransaction().isActive()) {
                    em.getTransaction().begin();
                }
                String noFactura = Utilities.obtenParametro(request, "idFact");
                String bndFact = Utilities.obtenParametro(request, "bndFact");
                Vector vecParams = new Vector();
                vecParams.clear();
                vecParams.add(usr.getUsuempresa());
                if (bndFact.equals("")) {
                    sqlBusq = " and (le.embfolio=" + noFactura + ")";
                } else {
                    if (bndFact.equals("true")) {
                        sqlBusq = " and (le.embfolio=" + noFactura + ")";
                    } else if (bndFact.equals("false")) {
                        sqlBusq = " and (le.embref='" + noFactura + "')";
                    }
                }
                List listFactura = EventManager.getArrayParameter(SQLFacturas.ContFacturas(sqlBusq), vecParams);
                if ((listFactura != null) && (!listFactura.isEmpty())) {
                    json = "{success:true,";
                    json += "data:{";
                    json += "nomFactura:" + listFactura.get(0).toString() + "}}";
                } else {
                    json = "{success:false,data:{nomFactura:0}}";
                }
            } catch (Exception e) {
                e.printStackTrace();
                em.getTransaction().rollback();
                json = "{success:false,data:{nomFactura:0}}";
            } finally {
                HibernateUtil.closeSession();
            }
        }
        return json;
    }

  

    public String getSqlStatus(String tipo) {
        String sql = "";
        tipo = tipo.replace("'", "");
        if (tipo.equals("S")) {
            sql = " and le.embestatus = 'S' ";
        } else if (tipo.equals("P")) {
            sql = " and le.embestatus = 'P' ";
        } else if (tipo.equals("T")) {
            sql = " and le.embestatus = 'T' and le.embfecentrega is null ";
        } else if (tipo.equals("A")) {
            sql = " and le.embestatus in ('A', 'R') ";
        } else if (tipo.equals("E")) {
            sql = " and le.embestatus = 'E' and NVL(le.embtiporechazo, 'A') not in ('T', 'P') ";
        } else if (tipo.equals("EP")) {
            sql = " and le.embestatus = 'E' and le.embtiporechazo='P' ";
        } else if (tipo.equals("RT")) {
            sql = " and le.embestatus = 'E' and le.embtiporechazo='T' ";
        } else {
            sql = "";
        }
        return sql;
    }

    public String status(String statusF, String tRechazo, String fechEntrega) {
        String estatus = "";
        if (statusF.equals("A")) {
            estatus = "Por Embarcar";
        } else if (statusF.equals("S")) {
            estatus = "Por Surtir";
        } else if (statusF.equals("P")) {
            estatus = "En Surtido";
        } else if (statusF.equals("R")) {
            estatus = "Preembarque";
        } else if (statusF.equals("T")) {
            if (fechEntrega == null) {
                estatus = "En Transito";
            } else {
                if (tRechazo == null) {
                    estatus = "Entregado E/T";
                } else if (tRechazo.equals("P")) {
                    estatus = "Entregado Parcial";
                } else if (tRechazo.equals("T")) {
                    estatus = "Rechazo Total";
                } else {
                    estatus = "Entregado E/T";
                }
            }
        } else if (statusF.equals("E")) {
            if (tRechazo == null) {
                estatus = "Entregado";
            } else if (tRechazo.equals("P")) {
                estatus = "Entregado Parcial";
            } else if (tRechazo.equals("T")) {
                estatus = "Rechazo Total";
            } else {
                estatus = "Entregado";
            }
        } else {
            estatus = "Entregado";
        }
        return estatus;
    }

    public String getAccion(String Accion) {
        String lAccion = "";
        if (Accion.equals("E")) {
            lAccion = "EN ESPERA";
        } else if (Accion.equals("R")) {
            lAccion = "REENVIO";
        } else if (Accion.equals("X")) {
            lAccion = "REEMBARQUE";
        } else if (Accion.equals("C")) {
            lAccion = "CANCELADO";
        } else if (Accion.equals("E")) {
            lAccion = "NA";
        }
        return lAccion;
    }

    public Integer calExDisponible(String real, String reservada) {
        int disp = 0, exReal = 0, exReserd = 0;
        try {
            exReal = Integer.parseInt(real);
            exReserd = Integer.parseInt(reservada);
            disp = exReal - exReserd;
        } catch (Exception e) {
            e.printStackTrace();
            disp = 0;
        }
        return disp;
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
            throws ServletException,
            IOException {
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
            throws ServletException,
            IOException {
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
