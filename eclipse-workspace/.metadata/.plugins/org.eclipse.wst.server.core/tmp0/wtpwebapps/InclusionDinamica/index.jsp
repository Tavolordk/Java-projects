
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page Inclusión dinámica</title>
    </head>
    <body>
        <h1>Ejemplo inclusión dinámica</h1>
        <br/>
        <jsp:include page="paginas/recursoPublico.jsp"/>
        <br/>
        <jsp:include page="WEB-INF/recursoPrivado.jsp">
        <jsp:param value="yellow" name="colorFondo"/>
        </jsp:include>
    </body>
</html>
