<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Alcance de variables</title>
</head>
<body>
   <h1>JSP Privado y donde se muestra alcance de variables</h1>
   <br/>
   Variable de Request:
   Base: ${rectanguloRequest.base}
   Altura: ${rectanguloRequest.altura}
   Area: ${rectanguloRequest.area }
   <br/>
   Variable de Sesión:
   Base: ${rectanguloSesion.base}
   Altura: ${rectanguloSesion.altura}
   Area: ${rectanguloSesion.area }
   <br/>
   Variable de Aplicación:
   Base: ${rectanguloApplication.base}
   Altura: ${rectanguloApplication.altura}
   Area: ${rectanguloApplication.area }
   <br/>
   <a href="${pageContext.request.contextPath}/index.jsp">Regresar al inicio</a>
</body>
</html>