<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JSP con expresiones</title>
</head>
<body>
<h1>JSP algunos ejemplos de expresiones</h1>
Concatenación: <%="Chinga "+ "Tu " + "Madre " + ":D" %>
<br>
Operación matemática: <%= 2*3/6 %>
<br>
Sesión ID: <%= session.getId() %>
<br>
<br>
<a href="index.jsp">Regresar al inicio</a>
</body>
</html>