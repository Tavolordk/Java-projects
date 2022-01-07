<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JSP con scriptles</title>
</head>
<body>
<h1>Esto es un scriptles</h1>
<br>
<%--Scriptle para enviar información al navegador --%>
<%out.print("Saludos desde un scriptle");%>
<%--Scriptle para manipular los objetos implicitos --%>
<%String nombreAplicacion=request.getContextPath();
out.print("nombre de la aplicación: " + nombreAplicacion);
%>
<br>
<%--Scriptle con codigo condicionado --%>
<%if(session != null && session.isNew()) {
%>
La sesion si es nueva
<%}else if(session != null) {%>
La sesion no es nueva
<%} %>
<a href="index.jsp">Regresar al inicio</a>
</body>
</html>