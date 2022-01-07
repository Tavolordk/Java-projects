<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Despliegue de variables</title>
</head>
<body>
   <h1>Despliegue de variables</h1>
   Variable en alcance request: ${mensaje}
   variable en alcance sesion:
   <br/>
   Rectangulo:
   Base: ${rectangulo.base }
   Altura: ${rectangulo.altura }
   Area: ${rectangulo.area }
   <br/>
   <a href="${pageContext.request.contextPath }/index.jsp">
     Regresar al inicio
   </a>
</body>
</html>