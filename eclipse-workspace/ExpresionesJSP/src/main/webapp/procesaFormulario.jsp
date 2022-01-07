<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Formulario usando JSP</title>
</head>
<body>
<h1>Resultado: </h1>
Usuario: <%= request.getParameter("usuario") %>
<br>
Password: <%= request.getParameter("password") %>
<br>
<br>
<a href="index.jsp">Regresar al inicio</a>
</body>
</html>