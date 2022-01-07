package Gus66.carritoCompras;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/CarritoServlet")
public class CarritoServlet extends HttpServlet{
   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
   {
	   response.setContentType("text/html;charset=UTF-8");
	   //Creamos o recuperamos el objeto HttpSession
	   HttpSession sesion = request.getSession();
	   //Recuperamos la lista de articulos agregados si ya existe
	   List<String> articulos = (List<String>) sesion.getAttribute("articulos");
	   //Verificamos si la lista de articulos existe
	   if(articulos == null)
	   {
		   //inicializamos la lista de articulos
		   articulos = new ArrayList<>();
		   sesion.setAttribute("articulos", articulos);
	   }
	   //Procesamos el nuevo art�culo
	   String articuloNuevo = request.getParameter("articulo");
	   //revisamos y agregamos el articulo nuevo
	   if(articuloNuevo != null && !articuloNuevo.trim().equals(""))
	   {
		   articulos.add(articuloNuevo);
	   }
	   //Imprimimos la lista de articulos
	   PrintWriter out = response.getWriter();
	   out.print("<h1>Lista de Articulos</h1>");
	   out.print("<br>");
	   //Iteramos todos los art�culos
	   for(String articulo: articulos)
	   {
		   out.print("<li>" + articulo + "</li>");
	   }
	   //Agregamos un link para regresar al inicio
	   out.print("<br>");
	   out.print("<a href='/carritoCompras'>Regresar al inicio</a>");
	   out.close();
   }
}
