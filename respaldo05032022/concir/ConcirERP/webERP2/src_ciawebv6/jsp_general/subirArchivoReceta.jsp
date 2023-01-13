<%-- 
    Document   : subirArchivo
    Created on : 10/03/2010, 05:45:01 PM
    Author     : jalbch
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Subir Archivo</title>
 <script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript">
function valid(){
	return !($('idArchivo').value.blank())
}
</script>
<style type="text/css">
.txr {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: #14A7D8;
}
.txbod {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    color: #070707;
}
</style>
    </head>
    </head>
    <body>
        <%
                    String strId = (request.getParameter("id") == null ? (String) request.getAttribute("id") : request.getParameter("id"));
                    String strNomEntity = (request.getParameter("entity") == null ? (String) request.getAttribute("entity") : request.getParameter("entity"));
                    String strNomCampo = (request.getParameter("campo") == null ? (String) request.getAttribute("campo") : request.getParameter("campo"));
                    String carpeta = (request.getParameter("carpeta") == null ? (String) request.getAttribute("carpeta") : request.getParameter("carpeta"));
                    String idCln = (request.getParameter("idCln") == null ? (String) request.getAttribute("idCln") : request.getParameter("idCln"));

        %>
        <table width="60%" border="1" cellspacing="1" align="center" cellpadding="0">
            <tr>
                <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="15%"></td>
                            <td colspan="2" align="center"><strong class="txr">Agregar Archivos</strong></td>
                            <td width="15%">&nbsp;</td>
                        </tr>
                        <tr>
                            <td width="15%"></td>
                            <td colspan="2" class="txbod"><%if(request.getAttribute("error")!=null){ out.print(request.getAttribute("error").toString());}%><%if (request.getAttribute("NomArchivo") != null) {%>El archivo <%=request.getAttribute("NomArchivo")%> se subio al servidor con exito <%}%></td>
                            <td width="15%">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td width="35%">&nbsp;</td>
                            <td width="35%">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td colspan="2" rowspan="2">
                                <form name="frmSubirArchivo" id="idFormFoto" enctype="multipart/form-data" method="post" action="<%=request.getContextPath()%>/SubirArchivos?bnd=1" onsubmit="return valid();"  >
                                    <input name="strId" id="idStrId" type="hidden" value="<%=strId%>"/>
                                    <input name="idCln" id="strIdCliente" type="hidden" value="<%=idCln%>"/>
                                    <input name="strNomEntity" id="idStrNomEntity" type="hidden" value="<%=strNomEntity%>"/>
                                    <input name="strNomCampo" id="idStrNomCampo" type="hidden" value="<%=strNomCampo%>"/>
                                    <input name="carpeta" id="idCarpeta" type="hidden" value="<%=carpeta%>"/>
                                    <input name="TipoArchivo" id="idTipoArchivo" type="hidden" value="156"/>
                                    <input name="dir" id="idDir" type="hidden" value="/jsp_general/subirArchivoReceta.jsp"/>
                                    
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center"><input name="archivo" type="file" id="idArchivo" size="60" ></td>
                                        </tr>
                                        <tr>
                                            <td><input name="btnSubir" type="submit" class="botones" value=" Subir "></td>
                                        </tr>
                                    </table>
                                </form>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table></td>
            </tr>
        </table>




    </body>
</html>
