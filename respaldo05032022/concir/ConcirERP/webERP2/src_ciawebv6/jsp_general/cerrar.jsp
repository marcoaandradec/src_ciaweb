<%@ page contentType="text/html; charset=iso-8859-1"  errorPage=""%>
<%@page import="java.util.*"%>
<html>
<head>
<title></title>
<%
    session.invalidate();
%>
<SCRIPT language="JavaScript" type="text/javascript">
function Limpia(){
document.form1.submit();
history.replace(history.forward(1));
}
</SCRIPT>
</head>
<body onLoad="Limpia()">
<form name="form1" method="post" action="<%=request.getContextPath()%>/jsp_general/login.jsp">
</form>
</body>
</html>