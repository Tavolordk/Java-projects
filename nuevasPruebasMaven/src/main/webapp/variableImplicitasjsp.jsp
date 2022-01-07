<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>EL y variables implicitas</title>
</head>
<body>
   <h1>Nuestro primer web con variables implicitas y EL</h1>
   <ul>
       <li>Nombre de la aplicación: ${pageContext.request.contextPath }</li>
       <li>Navegador desde el que te conectas: ${header["User-Agent"] }</li>
       <li>ID session: ${cookie.JSESSIONID.value} </li>
       <li>Web Server: ${pageContext.servletContext.serverInfo}</li>
       <li>Valor parámetro: ${param.usuario}</li>
       <a href="index.jsp">Volver al inicio</a>
   </ul>
</body>
</html>