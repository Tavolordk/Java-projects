package Gus66.tavo;

import java.io.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.*;

@WebServlet("/Cookies")
public class CookiesServletJava extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		//Suponemos que el usuario visita por primera vez nuestro sitio
		boolean nuevoUsuario = true;
		//Obtenemos el arreglo de cookies
		Cookie[] cookies = request.getCookies();
		//Buscamos si ya existe una cookie creada con anterioridad 
		//llamada visitanteRecurrente
		if(cookies != null)
		{
			for(Cookie c: cookies)
			{
				if(c.getName().equals("visitanteRecurrente")&&c.getValue().equals("si"))
				{
					//si ya existe un usuario en la clase recurrente
					nuevoUsuario = false;
					break;
				}
			}
		}
		
		String mensaje = null;
		if(nuevoUsuario)
		{
			Cookie visitanteCookie = new Cookie("visitanteRecurrente","si");
			response.addCookie(visitanteCookie);
			mensaje="Gracias por visitar el sitio por primera vez";
		}
		else
		{
			mensaje="Gracias por visitar de nuevo el sitio";
		}
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print(mensaje);
		out.close();
	}

}
