
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Lee los valores del JavaBean</title>
</head>
<body>
<h1>Valores leídos del rectángulo</h1>
<jsp:useBean id="rectangulo" class="Web.Rectangulo" scope="session" />
<br/>
Valor base: <jsp:getProperty property="base" name="rectangulo"/>
<br/>
Valor altura: <jsp:getProperty property="altura" name="rectangulo"/>
<br/>
Valor área: <jsp:getProperty property="area" name="rectangulo"/>
<br/>
<br/>
<a href="index.jsp">Regresar al inicio</a>
</body>
</html>