/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.control.reportes;

import com.control.factura.CtrlUtilFactura;
import com.entity.Liempresas;
import com.entity.Liusuarios;
//import com.util.CompilerReport;
import com.util.CompilerReportDinQuery;
import com.util.Fecha;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import com.util.GotoPage;
import com.util.GetNameReport;
import com.util.Utilities;

/**
 *
 * @author mandrade
 */
public class ReportFactEstatus extends HttpServlet {

    private String nombre_origen;
    private String pathFile;
    private String diagonal;
    private String pathXml;

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
        try {
            String query1 = "", query2 = "", query = "";
            HttpSession session = request.getSession(false);
            Liusuarios usr = Utilities.ReactivarSession(request);
            Liempresas emp = Utilities.ObtenerEmpresa(usr.getUsuempresa());
            GetNameReport objNamereport = new GetNameReport();
            Map param = new HashMap();
            CompilerReportDinQuery compiler = new CompilerReportDinQuery();
            String fechaIni = Utilities.obtenParametro(request, "fInicio").replaceAll("'", "");
            String fechaFin = Utilities.obtenParametro(request, "fFin").replaceAll("'", "");
            String idTipoCliente = Utilities.obtenParametro(request, "idTipoCli").replaceAll("'", "");
            String TipoCli = Utilities.obtenParametro(request, "TipoCli").replaceAll("'", "");
            String estatus = Utilities.obtenParametro(request, "status").replaceAll("'", "");
            String IdStatus = Utilities.obtenParametro(request, "idStatus").replaceAll("'", "");
            CtrlUtilFactura objUtil = new CtrlUtilFactura();
            if (!fechaIni.equals("")) {param.put("FECHAINI", fechaIni);}
            if (!fechaFin.equals("")) {param.put("FECHAFIN", fechaFin);}
            if (!TipoCli.equals("")) {param.put("TIPOCLIENTE", TipoCli);}else{param.put("TIPOCLIENTE", null);}
            if (!estatus.equals("")) {param.put("ESTATUS", estatus);}else{param.put("ESTATUS", null);}
            if(emp!=null){param.put("EMPRESA", emp.getEmpnombre());}
            if (!idTipoCliente.equals("")) {
                query1 = " and lc.clitipo='" + idTipoCliente + "' ";
            }
            if (!IdStatus.equals("")) {
                query2 = objUtil.getSqlStatus(IdStatus);
            }
            query = "select le.embestatus,le.embtiporechazo,le.embref,le.embenvio,le.embcliente,lc.clinombre,lp.pobnombre,le.embcajas,le.embvalor "
                    + ",le.embfechafac,le.embfecharec,le.embfechaprog,le.embfecembarque,le.embfecentrega,le.embcoms "
                    + " from Liembarques le,Liclientes lc,Lipoblaciones lp "
                    + " where (lp.pobclave=le.embpoblacion) and (lc.clinumero=le.embcliente and lc.cliempresa=le.embempresa)  "
                    + " and (trunc(le.embfechafac) between trunc(to_date('" + fechaIni + "')) and trunc(to_date('" + fechaFin + "'))) "
                    + query1
                    + " and le.embempresa=" + usr.getUsuempresa()
                    + query2
                    + "  order by le.embref";
            String nombreReport = "reporteFacturas" + objNamereport.obtenerNombre() + ".xls";
            session.setAttribute("ex", nombreReport);
            //Area de envio de parametros
            pathFile = session.getServletContext().getRealPath("/");
            diagonal = pathFile.substring(pathFile.length() - 1, pathFile.length());
            pathFile += "ReportesCompilados" + diagonal + nombreReport;
            pathXml = session.getServletContext().getRealPath("/");
            param.put("DIR", pathXml + "ReportesXML" + diagonal + "Generales" + diagonal);
            pathXml += "ReportesXML" + diagonal + "Generales" + diagonal + "reportFacturas.jrxml";
            compiler.setPath(pathXml);
            //Arroja el resultado del reporte ya compilado
            compiler.setUrlFile(pathFile);
            compiler.viewExcel(response, param, query, nombreReport);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
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
