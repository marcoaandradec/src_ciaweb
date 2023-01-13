<%-- 
    Document   : reciboVacuna
    Created on : 8/02/2011, 11:18:03 AM
    Author     : Tecnologia-2
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Recibo vacuna</title>
    </head>
    <body>
        <%if(request.getParameter("datosPago").equals("true")){
            if(request.getParameter("tipoPag").equals("dep")){%>
            <table align=center width=90%>
            <tr>
            <td colspan="4" align="center"><font style="font-family:Arial"><b>RECIBO DE PAGO DE VACUNA</b></font></td>
            </tr>
            <tr>
            <td colspan="4" style="font-family:Arial">PACIENTE: <%=request.getParameter("datos").split("wkx")[6]%></td>
            </tr>
            <tr>
            <td style="font-family:Arial">Folio:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[0]%></td>
            <td style="font-family:Arial">Monto pago:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[1]%></td>
            </tr>
            <tr>
            <td style="font-family:Arial">Fecha:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[2]%></td>
            <td style="font-family:Arial">Banco:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[3]%></td>
            </tr>
            <tr>
            <td style="font-family:Arial">Folio banco:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[4]%></td>
            <td style="font-family:Arial">Sucursal:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[5]%></td>
            </tr>
            </table>
            <%}else{%>
            <table align=center width=90%>
            <tr>
            <td colspan="4" align="center"><font style="font-family:Arial"><b>RECIBO DE PAGO DE VACUNA</b></font></td>
            </tr>
            <tr>
            <td colspan="4" style="font-family:Arial">PACIENTE: <%=request.getParameter("datos").split("wkx")[7]%></td>
            </tr>
            <tr>
            <td style="font-family:Arial">Folio:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[0]%></td>
            <td style="font-family:Arial">Ultimos 4 digitos:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[1]%></td>
            </tr>
            <tr>
            <td style="font-family:Arial">Fecha:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[2]%></td>
            <td style="font-family:Arial">Monto:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[3]%></td>
            </tr>
            <tr>
            <td style="font-family:Arial">Tipo de tarjeta:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[4]%></td>
            <td style="font-family:Arial">Aceptada:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[5]%></td>
            </tr>
            <tr>
            <td style="font-family:Arial">No autorizacion:</td>
            <td style="font-family:Arial"><%=request.getParameter("datos").split("wkx")[6]%></td>
            </tr>
            </table>
            <%}%>
        <%}else{%>
            <%=request.getParameter("htmlImprimir")%>
        <%}%>
        <script language="javascript" type="text/javascript">
            window.print();
        </script>
    </body>
</html>
