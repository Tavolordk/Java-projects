<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Compras</title>
    </head>
    <body>
        <h1>Ejemplo carrito compras</h1>
        <form action="/carritoCompras/CarritoServlet" method="post" name="form1">Artículo a agregar: 
        <input type="text" name="articulo">
        <br>
        <input type="submit" value="Enviar">
        </form>
    </body>
</html>
