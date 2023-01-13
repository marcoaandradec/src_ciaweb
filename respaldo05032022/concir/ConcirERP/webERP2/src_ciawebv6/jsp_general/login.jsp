<%-- 
    Document   : login
    Created on : 29/12/2019, 11:56:38 AM
    Author     : marco
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%

    session.invalidate();

%>
<html>
    <head>
        <title>:: Bienvenido, - CIA -::</title>
        <link rel="SHORTCUT ICON" href="<%=request.getContextPath()%>/img/iconArgo.png">
        <style>
            .linkpowered{
                font-family: Arial;
                font-size: 10px;
            }
        </style>
        <!-- Nuestras libraries -->
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/iconos.css" />
        <script type="text/javascript" language="javascript">var contexto = '<%= request.getContextPath()%>';</script>
    
        <!--Ext V7.2-->
        <link href="<%=request.getContextPath()%>/js/build7/packages/charts/classic/classic/resources/charts-all.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/js/build7/classic/theme-gray/resources/theme-gray-all.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/js/build7/packages/ux/classic/classic/resources/ux-all.css" rel="stylesheet" type="text/css"/>

        <script src="<%=request.getContextPath()%>/js/build7/ext-all-debug.js" type="text/javascript"></script>
        <script src="<%=request.getContextPath()%>/js/build7/classic/locale/locale-es.js" type="text/javascript"></script>

        <!-- End Ext V6.2 libraries -->
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/CJL_CookieUtil.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/login.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    </head>
    <body><br/><br/>

        <form id="formLog" name="formLog" method="post" action="<%=request.getContextPath()%>/Usuario?bnd=13">
            <input type="hidden" id="usuario" name="usuario"/>
        </form>
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td align="center">
                    <div id="divLogin"></div>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </body>
</html>