<%-- 
    Document   : avisos.jsp
    Created on : 9/04/2010, 04:41:18 PM
    Author     : marco
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1" import="com.entity.Usuario,com.entity.Avisos,com.dao.EventManager,com.dao.util.HibernateUtil,java.util.List,com.util.Fecha, com.util.manejo_Cookies;"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>JSP Page</title>
    </head>
    <body>
        <%
                    try {
                        Usuario usr = null;
                        
                        int idUsuario = Integer.parseInt(manejo_Cookies.get_Cookie("idUsuario",request));
                        usr = (Usuario) EventManager.getSingleList(Usuario.class, idUsuario);
                      
                        String query = "Select avs From Avisos avs "
                                + "Where avs.avsTipoMostrar In (1) "
                                + "Or (avs.avsTipoMostrar In (2) And avs.avsIdGenerico = " + (usr.getUIdUsuario() == null ? null : usr.getUIdUsuario()) + ") "
                                + "Or (avs.avsTipoMostrar In (3) And avs.avsIdGenerico = " + (usr.getUIdPuesto() == null ? null : usr.getUIdPuesto().getUpIdPuesto()) + ") "
                                + "Or (avs.avsTipoMostrar In (4) And avs.avsIdGenerico = " + (usr.getUIdOrigen() == null ? null : usr.getUIdOrigen().getOIdOrigen()) + ") "
                                + "Or (avs.avsTipoMostrar In (5) And avs.avsIdGenerico = " + (usr.getUIdAreaAtencion() == null ? null : usr.getUIdAreaAtencion().getCaaIdAreaAtencion()) + ") "
                                + "Order By avs.avsFechaAlta Desc";
                        List lstAvisos = EventManager.getArray(query);
                        if (lstAvisos != null) {
                            if (!lstAvisos.isEmpty()) {
                                for (int i = 0; i < lstAvisos.size(); i++) {
                                    Avisos avs = (Avisos) lstAvisos.get(i);
                                    Fecha fecha = new Fecha(avs.getAvsFechaAlta());
        %>
        <b><%=fecha.getDia() + " / " + fecha.obtenMes(fecha.getMes(),1) + " / " + fecha.getAnio()%></b><br>
        <%=avs.getAvsAviso()%><hr>
        <%
                                }
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    } finally {
                        HibernateUtil.closeSession();
                    }
        %>
    </body>
</html>
