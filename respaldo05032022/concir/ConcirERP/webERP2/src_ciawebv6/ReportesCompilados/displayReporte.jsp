<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Untitled Document</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<%
session = request.getSession(true);
String direccion="";
direccion=session.getAttribute("ex").toString();%>
<body onLoad="document.formReporte.submit()">
<form name="formReporte" method="post" action="<%=request.getContextPath()%>/ReportesCompilados/<%=direccion%>" >
</form>
</body>
</html>
