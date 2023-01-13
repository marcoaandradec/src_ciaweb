/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.control.almacen;

import com.dao.RequestPostApi;
import com.entity.CentralProducto;
import com.entity.ConfigUsuario;
import com.entity.Usuario;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.util.ReadProps;
import com.util.Utilities;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;

/**
 *
 * @author mandrade
 */
@WebServlet(name = "CtrlProducto", urlPatterns = {"/Producto"})
public class CtrlProducto extends HttpServlet {

    RequestPostApi requetPost = new RequestPostApi();
    ReadProps props = new ReadProps();

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setContentType("UTF-8");
        response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
        response.setHeader("Pragma", "no-cache"); //HTTP 1.0
        response.setDateHeader("Expires", 0);
        PrintWriter out = response.getWriter();
        String bnd = Utilities.obtenParametro(request, "busqBnd");     
         String idEmpresa =Utilities.obtenParametro(request,"idEmpresa");
        try {
            switch (bnd) {
                case "1":
                    out.print(ObtenerProducto(request, response));
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            out.close();
            
        }
    }
//metodo para obetner los productos
    public String ObtenerProducto(HttpServletRequest request, HttpServletResponse response) {
        String JSONVal = "",idEmpresa="";
        HttpSession session = request.getSession(true);
        
        try {
            idEmpresa=Utilities.obtenParametro(request,"idEmpresa");
            Usuario usuario = new Usuario();
            usuario.nombre = Utilities.obtenParametro(request, "username");
            usuario.clave = Utilities.obtenParametro(request, "password");
            String service = props.getValueProp("ServiceProducto");
            String content = new ObjectMapper().writeValueAsString(usuario);
            String repuesta = requetPost.getPost(service+idEmpresa, content);
            CentralProducto Producto= new ObjectMapper().readValue(repuesta, CentralProducto.class);
            JSONVal = new ObjectMapper().writeValueAsString(Producto.items);

        } catch (Exception e) {
            JSONVal = "";
        }
        return JSONVal;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
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
     *
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
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
