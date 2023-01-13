/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//package com.ctrl.ctrlJurisdiccion;

import com.util.CompilerReport;
import com.util.GotoPage;
import java.io.*;
import java.net.*;

import java.util.HashMap;
import java.util.Map;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

/**
 *
 * @author desarrollo-16
 */
public class ctrlReportActivos extends HttpServlet {

    /**
    * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
    * @param request servlet request
    * @param response servlet response
    */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
      HttpSession session = request.getSession(false);
        Map param = new HashMap();
        CompilerReport compiler = new CompilerReport();
        //Recuperación de parametros
        String tipoDespliegue = "", cveEstado = "", cveJurisdiccion = "", fechaInicio = "", fechaFin = "", pathFile = "", pathXml = "", diagonal = "";
        if (request.getParameter("tipoDespliegue") != null) {
            tipoDespliegue = (String) request.getParameter("tipoDespliegue");
        }
        if (request.getParameter("fechaInicio") != null) {
            fechaInicio = (String) request.getParameter("fechaInicio");
            param.put("FECHA_INICIO", fechaInicio);
        }
        if (request.getParameter("fechaFin") != null) {
            fechaFin = (String) request.getParameter("fechaFin");
            param.put("FECHA_FIN", fechaFin);
        }
        //Area de envio de parametros
        pathFile = session.getServletContext().getRealPath("/");
        diagonal = pathFile.substring(pathFile.length() - 1, pathFile.length());
        if (tipoDespliegue.equals("html")) {
            pathFile += "archivos" + diagonal + "mensual.jsp";
        } else if (tipoDespliegue.equals("excel")) {
            pathFile += "archivos" + diagonal + "mensual.xls";
        }
        pathXml = session.getServletContext().getRealPath("/");
        System.out.println(pathXml);
        param.put("dir", pathXml + "xml"+diagonal+"IndicadoresNacionalesActivos" + diagonal);
        if (request.getParameter("ESTADO") != null && !request.getParameter("ESTADO").equals("")) {
            if ((request.getParameter("JURISDICCION") != null && !request.getParameter("JURISDICCION").equals("00")) || request.getParameter("JURISDICCION").trim().equals("")) {
                cveJurisdiccion = (String) request.getParameter("JURISDICCION");
                param.put("CVE_JUR", cveJurisdiccion);
            } else {
                param.put("CVE_JUR", "");
            }
            cveEstado = (String) request.getParameter("ESTADO");
            param.put("CVE_EDO", cveEstado);
            pathXml += "xml" + diagonal +"IndicadoresNacionalesActivos"+ diagonal+"reporteGeneralIndicadoresActivosF.jrxml";
        } else {
            pathXml += "xml" + diagonal +"IndicadoresNacionalesActivos"+ diagonal+"reporteGeneralIndicadoresActivos.jrxml";
        }


        //pathXml += "xml" + diagonal + "reporteGeneralIndicadoresF.jrxml";
        compiler.setPath(pathXml);
        compiler.setUrlFile(pathFile);

        if (tipoDespliegue.equals("html")) {
            compiler.getHTML(param);
            GotoPage.gotoPage("/reportes_jsp/displayReporte.jsp", request, response, this.getServletContext());
        } else if (tipoDespliegue.equals("excel")) {
            compiler.viewExcel(response, param);
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
    * Handles the HTTP <code>GET</code> method.
    * @param request servlet request
    * @param response servlet response
    */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
    * Handles the HTTP <code>POST</code> method.
    * @param request servlet request
    * @param response servlet response
    */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
    * Returns a short description of the servlet.
    */
    public String getServletInfo() {
        return "Short description";
    }
    // </editor-fold>
}
