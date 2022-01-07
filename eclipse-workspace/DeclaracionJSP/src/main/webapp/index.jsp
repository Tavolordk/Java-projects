<%--Agregamos una declaración --%>
<%!
//Declaramos una variable con su método get
private String usuario = "Octavio";

public String getUsuario()
{
	return this.usuario;
}
//Declaramos un contador de visitas
private int contadorVisitas=1;
%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Uso de declaraciones con JSP's</title>
    </head>
    <body>
        <h1>Ejemplo de declaraciones con JSP</h1>
        Usuario default: <%=this.usuario %>
        <br>
        Valor del usuario por el método: <%=this.getUsuario() %>
        <br>
        Visita n°: <%=this.contadorVisitas++ %>
    </body>
</html>
