<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
<title>Formulario Servlet</title>
</head>
<body>
<h1>Formulario Servlet</h1>
<form action="/parametros/Servlet" name="form1" method="post">
Usuario: <input type="text" name="usuario">
<br>
Password: <input type="password" name="password">
<br>
<input type="submit" value="Enviar">
<input type="reset" value="Limpiar">
</form>
</body>
</html>