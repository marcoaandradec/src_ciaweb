<%@page import="java.text.SimpleDateFormat;
import java.util.*;" contentType="text/html" pageEncoding="ISO-8859-1"%>
<%
            SimpleDateFormat fmtmes = new SimpleDateFormat("MM");
            SimpleDateFormat fmtanio = new SimpleDateFormat("yyyy");
            Calendar calendario = Calendar.getInstance();
            Date fecha = calendario.getTime();
            String mes = "", anio = "", fechaMin = "", fechaMax = "", Scriptjs = "";
            mes = fmtmes.format(fecha);
            anio = fmtanio.format(fecha);
            fechaMin = "01/" + mes + "/" + anio;
            Integer vari = Integer.parseInt(mes) + 1;
            if (vari >= 10) {
                fechaMax = "02/" + vari + "/" + anio;
            } else {
                fechaMax = "02/0" + vari + "/" + anio;
            }

%>
<script type="text/javascript">var fechMin ='<%=fechaMin%>';var fechMax='<%=fechaMax%>'; var Scriptjs=<%=session.getAttribute("modulos").toString()%>;</script>
<!--Modulos Principales-->
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/modulos/archivos_genericos/FuncionesGenericas.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/modulos/archivos_genericos/Records.js"></script>
<!--<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/modulos/Facturas/layoutsFactura/Facturas.js"></script>-->
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/modulos/almacen/PanelProducto.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/principal.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/Utils.js"></script>

<!--Modulo Facturas
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/modulos/Facturas/ConsultaFactura1.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/modulos/Facturas/PanelFactura.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/modulos/Facturas/PanelExistencias.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/js_scripts/modulos/Facturas/PanelBuscarProducto.js"></script>-->