<%-- 
    Document   : excelEnvio
    Created on : 29/04/2010, 01:16:52 PM
    Author     : Tecnologia-2
--%>

<%@page contentType="application/vnd.ms-excel" pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<% String[] env = request.getParameter("numEnvio").split("&%");  %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Envios</title>
    </head>
    <body>
        <table>
            <tr>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Id_Cliente</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>NombreComp</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Domicilio</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Num_Ext</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Num_Int</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Colonia</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Poblacion</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Ciudad</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Estado</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Id_Pais</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Pais</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Telefono</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>CP</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Indicador</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Contacto</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Calle1</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Calle2</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Ref1</strong></font></td>
                <td bgcolor="#993366"><font color="#FFFFFF"><strong>Ref2</strong></font></td>


            </tr>
            <% int nCols = 19;
            for(int j = 0; j < env.length/nCols; j++){ %>
            <tr>
                <% for(int i = j * nCols; i < (j * nCols) + nCols; i++){ %>
                <td><%=env[i]%></td>
                <% } %>
            </tr>
            <% } %>
        </table>
    </body>
</html>
