<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0">
	<jsp:directive.page contentType="text/html; charset=UTF-8" 
		pageEncoding="UTF-8" session="false"/>
	<jsp:output doctype-root-element="html"
		doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"
		doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
		omit-xml-declaration="true" />
<%@page errorPage="/WEB-INF/manejoErrores.jsp"%>
<%@page import="JSP666.EjemploExcelJSP.Conversiones, java.util.Date" %>
<%@page contentType="application/vnd.ms-excel" %>
<%
String nombreArchivo = "tavo.xls";
response.setHeader("Content-Disposition", "attachment;filename=" + nombreArchivo);
%>
<!DOCTYPE html>
<html>
    <head>
        <title>Reporte de Excel</title>
    </head>
    <body>
        <h1>Reporte de Excel</h1>
        <br/>
        <table border="1">
        <tr>
            <th>Curso</th>
            <th>Descripción</th>
            <th>Fecha</th>
        </tr>
        <tr>
            <td>1. Fundamentos de Java</td>
            <td>Aprenderemos la sintaxis básica de Java</td>
            <td><%= Conversiones.format(new Date()) %></td>
        </tr>
         <tr>
            <td>2. Programación con Java</td>
            <td>Pondremos en práctica la concepción de POO</td>
            <td><%= Conversiones.format(new Date()) %></td>
        </tr>    
        </table>
    </body>
</html>
</jsp:root>