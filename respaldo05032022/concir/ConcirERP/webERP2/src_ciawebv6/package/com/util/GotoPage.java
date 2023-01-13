/*
 * GotoPage.java
 *
 * Created on 20 de agosto de 2007, 06:43 PM
 */
package com.util;

import java.io.*;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

/**
 *
 * @author jmarquez
 * @version
 */
public class GotoPage {

    public static void gotoPage(String address, HttpServletRequest request, HttpServletResponse response, ServletContext sctx)
            throws ServletException, IOException {
        RequestDispatcher disp = sctx.getRequestDispatcher(address);
        PrintWriter out = response.getWriter();
        out.print(address);
        disp.forward(request, response);
    }

   
}
