
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Modificador JavaBean</title>
</head>
<body>
<h1>JavaBean modificador de rectángulo</h1>
<jsp:useBean id="rectangulo" class="Web.Rectangulo" scope="session"/>
Modificamos los atributos:
<br/>
<br/>
<%
    int baseValor =4;
    int alturaValor =3;
%>
<jsp:setProperty property="base" name="rectangulo" value="<%=baseValor %>"/>
Base: <%=baseValor %>
<br/>
<jsp:setProperty property="altura" name="rectangulo" value="<%=alturaValor %>"/>
Altura: <%=alturaValor %>
<br/>
<br/>
<a href="index.jsp">Regresar al inicio</a>
</body>
</html>