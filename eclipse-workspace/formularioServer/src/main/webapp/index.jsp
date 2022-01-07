<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <title>Ingrese datos</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="estilos.css">
        <script type="text/javascript" src="funciones.js"></script>
</head>
    <body>
        <form name="form1" action="/formularioServer/Resultado" method="post" onsubmit="return validarForma(this)">
        <input type="hidden" name="oculto" value="valorOculto">
        <table width="200" id="enfasis-columna">
        <caption>Formulario Registro de Datos</caption>
        <tr>
        <td class="columna">Usuario: (*)</td>
        <td>
         <input class="default" type="text" name="usuario" value="Escribe tu usuario" onfocus="this.select()">
        </td>
        </tr>
        
        <tr>
        <td class="columna">Password: (*)</td>
        <td><input class="default" type="password" name="password" value="Escribe tu contraseña" onfocus="this.select()"></td>
        </tr>
        
        <tr>
        <td class="columna">Tecnologías de Internet: (*)</td>
        <td>Java <input type="checkbox" name="tecnologia" value="Java">
        &nbsp; &nbsp; &nbsp;
        .Net <input type="checkbox" name="tecnologia" value="Net">
        &nbsp; &nbsp; &nbsp;
        PHP <input type="checkbox" name="tecnologia" value="PHP">
        </td>
        </tr>
        
        <tr>
        <td class="columna">Género: (*)</td>
        <td>Hombre<input type="radio" name="genero" value="H">
         &nbsp; &nbsp; &nbsp;
         Mujer <input type="radio" name="genero" value="M">
        </td>
        </tr>
        
        <tr>
        <td class="columna">Ocupación: (*)</td>
        <td>
        <select class="default" name="ocupacion">
        <option value="">Seleccionar</option>
        <option value="1">Estudiante</option>
        <option value="2">Licenciado</option>
        <option value="3">Profesor</option>
        <option value="4">Jubilado</option>
        <option value="5">Nini</option>
        </select>
        </td>
        </tr>
        
        <tr>
        <td class="columna">Música Favorita: </td>
        <td>
        <select multiple="multiple" class="default" name="musica">
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
        <option value="salsa">Salsa</option>
        <option value="corridos">Corridos</option>
        <option value="cumbia">Cumbia</option>
        <option value="tango">Tango</option>
        </select>
        </td>
        </tr>
        
        <tr>
        <td class="columna">Comentarios: </td>
        <td><textarea name="comentarios" rows="2" cols="50" class="default" onfocus="this.select()">Escribir un comentario</textarea></td>
        </tr>
        
        <tr style="text-align: center">
        <td><input type="reset" value="Limpiar" class="default"></td>
        <td><input type="submit" value="Enviar" class="default"></td>
        </tr>
        </table>
        </form>
    </body>
</html>
