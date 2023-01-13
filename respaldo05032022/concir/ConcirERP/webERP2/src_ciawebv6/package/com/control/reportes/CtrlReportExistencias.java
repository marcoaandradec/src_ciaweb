/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.control.reportes;

import com.control.factura.CtrlUtilFactura;
import com.entity.Liempresas;
import com.entity.Liusuarios;
import com.util.CompilerReportDinQuery;
import java.io.*;
import java.util.HashMap;
import java.util.Map;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import com.util.GetNameReport;
import com.util.Utilities;

/**
 *
 * @author mandrade
 */
public class CtrlReportExistencias extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        try {
            String query = "";
            HttpSession session = request.getSession(false);
            Liusuarios usr = Utilities.ReactivarSession(request);
            Liempresas emp = Utilities.ObtenerEmpresa(usr.getUsuempresa());
            GetNameReport objNamereport = new GetNameReport();
            Map param = new HashMap();
            CompilerReportDinQuery compiler = new CompilerReportDinQuery();
            String idProducts = Utilities.obtenParametro(request, "idProducts").replaceAll("'", "");
            String idAlmacen = Utilities.obtenParametro(request, "idalmacen").replaceAll("'", "");
            String nameProducts = Utilities.obtenParametro(request, "nomProduct").replaceAll("'", "");
            String nameAlmacen = Utilities.obtenParametro(request, "nomAlmacen").replaceAll("'", "");
            if(!nameProducts.equals("")){param.put("NOMPRODUCTO", nameProducts);}else{param.put("NOMPRODUCTO", null);}
            if(!nameAlmacen.equals("")){param.put("NOMALMACEN", nameAlmacen);}else{param.put("NOMALMACEN", null);}
            if(emp!=null){param.put("EMPRESA", emp.getEmpnombre());}
            if (!idProducts.equals("")) {
                idProducts = " and lp.prdclave like '" + idProducts + "%' ";
            }
            query = "select lp.prdclave,lp.prddescripcion,lp.prdlinea,lp.prdfamilia,lp.prdunidad,li.invreal,li.invresevado,li.invalmacen  "
                    + " from Liproductos lp,Liinventario li "
                    + " where li.invempresa=lp.prdempresa and li.invproducto=lp.prdclave and lp.prdempresa="+usr.getUsuempresa()
                    + " and li.invalmacen=" + idAlmacen + " and li.invreal>0 " + idProducts;
            String nombreReport = "reporteExcistencias" + objNamereport.obtenerNombre() + ".xls";
            session.setAttribute("ex", nombreReport);
            //Area de envio de parametros
            pathFile = session.getServletContext().getRealPath("/");
            diagonal = pathFile.substring(pathFile.length() - 1, pathFile.length());
            pathFile += "ReportesCompilados" + diagonal + nombreReport;
            pathXml = session.getServletContext().getRealPath("/");
            param.put("DIR", pathXml + "ReportesXML" + diagonal + "Generales" + diagonal);
            pathXml += "ReportesXML" + diagonal + "Generales" + diagonal + "reportExistencia.jrxml";
            compiler.setPath(pathXml);
            //Arroja el resultado del reporte ya compilado
            compiler.setUrlFile(pathFile);
            compiler.viewExcel( response, param, query, nombreReport);
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
