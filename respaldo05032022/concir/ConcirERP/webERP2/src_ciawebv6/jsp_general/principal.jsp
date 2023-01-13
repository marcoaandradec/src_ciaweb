<%-- 
    Document   : principal
    Created on : 5/01/2010, 11:39:43 AM
    Author     : m@rco.@ndrade
--%>
<%response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
            response.setHeader("Pragma", "no-cache"); //HTTP 1.0
            response.setDateHeader("Expires", 0);%>
<%@page contentType="text/html" pageEncoding="ISO-8859-1"import="com.util.manejo_Cookies" errorPage="../jsp_general/cerrar.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <link rel="SHORTCUT ICON" href="<%=request.getContextPath()%>/img/iconArgo.png">
        <title>:: Argo ::</title>
        <%//if (session.getAttribute("usuario") == null) {%>
        <!--<//jsp:forward page="/jsp_general/cerrar.jsp"/>-->
        <%//}%>
        <link rel="stylesheet" id="themecss" type="text/css" href="<%=request.getContextPath()%>/css/estilos.css" />
     
         <!--Ext V6.2-->
        <link href="<%=request.getContextPath()%>/js/build7/packages/charts/classic/neptune/resources/charts-all.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/js/build7/classic/theme-gray/resources/theme-gray-all.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/js/build7/packages/ux/classic/classic/resources/ux-all.css" rel="stylesheet" type="text/css"/>

        <script src="<%=request.getContextPath()%>/js/build7/ext-all-debug.js" type="text/javascript"></script>
        <script src="<%=request.getContextPath()%>/js/build7/classic/locale/locale-es.js" type="text/javascript"></script>

        <!-- End Ext V6.2 libraries -->
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/CJL_CookieUtil.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <!-- End Ext V6.2 libreries -->
        <%@ include file = "../includes/scripts.jsp"%>
        <%@ include file = "../includes/ext_objetos.jsp"%>
    </head>
    <body onmousemove="coordenadasMouse(event)">
        <div style="display:none;">
            <!-- Start page content -->
            <div id="start-div">
                <div style="float:left;" ></div>
                <div style="margin-left:100px;"></div>
            </div>
        </div>
        <form action="<%=request.getContextPath()%>/PdfEnvio" method="post" target="_top" name="frmPdfEnvio" id="frmPdfEnvio"><input type="hidden" name="idEnvio" value="0" /></form>
        <form action="<%=request.getContextPath()%>/jsp_general/excelEnvio.jsp" method="post" target="_blank" name="frmExcelEnvio" id="frmExcelEnvio"><input type="hidden" name="numEnvio" value="0" /></form>
        <form action="<%=request.getContextPath()%>/ReportFactEstatus" method="get" target="_blank" name="frmExportExcel" id="frmExportExcel">
            <input type="hidden" name="fInicio"/><input type="hidden" name="fFin"/><input type="hidden" name="idTipoCli"/>
            <input type="hidden" name="status"/><input type="hidden" name="idStatus" value="0"/><input type="hidden" name="tpBusqueda" value="0" />
            <input type="hidden" name="TipoCli"/>
        </form>
        <form action="<%=request.getContextPath()%>/ReportExistencias" method="post" target="_blank" name="frmExpExlExist" id="frmExpExlExist">
            <input type="hidden" name="idProducts"/><input type="hidden" name="nomProduct"/><input type="hidden" name="idalmacen"/>
            <input type="hidden" name="nomAlmacen"/>
        </form>
    </body>
</html>
