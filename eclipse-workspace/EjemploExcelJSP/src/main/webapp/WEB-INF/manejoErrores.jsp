<%@page isErrorPage="true" %>
<%@page import="java.io.*" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
<title>Manejo de errores</title>
</head>
<body>
<h1>Errores manejados</h1>
<br/>
Ocurri� una excepci�n: <%=exception.getMessage() %>
<br/>
<textarea rows="5" cols="30">

<% exception.printStackTrace(new PrintWriter(out)); %>

</textarea>
</body>
</html>
