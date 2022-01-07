<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
   <title>Ejemplo MVC2</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<h2>Modelo vista controlador parte 2</h2>
<br/>
<div style="color:red">${mensaje }</div>
<br/>
<a href="${pageContext.request.contextPath}/ServletControlador">
    Link al servlet controlador sin parametros
</a>
<br/>
<a href="${pageContext.request.contextPath}/ServletControlador?accion=agregaVariables">
    Link al servlet controlador para agregar las variables
</a>
<br/>
<a href="${pageContext.request.contextPath}/ServletControlador?accion=listarVariables">
    Link al servlet controlador para listar las variables
</a>
</body>
</html>