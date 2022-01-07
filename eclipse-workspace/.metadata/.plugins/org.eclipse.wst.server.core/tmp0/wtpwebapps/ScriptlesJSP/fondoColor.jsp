<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
String fondo = request.getParameter("colorFondo");
if(fondo == null || fondo.trim().equals(""))
{
	fondo="white";
}
%>
<html>
<head>
<meta charset="UTF-8">
<title>JSP cambio de color</title>
</head>
<body bgcolor="<%=fondo%>">
<h1>JSP cambiando el color</h1>
<br>
Color de fondo aplicado: <%=fondo %>
<br>
<a href="index.jsp">Regresar al inicio</a>
</body>
</html>