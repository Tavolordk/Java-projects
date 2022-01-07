package org.apache.maven.plugins.parametros;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Servlet")
public class Servlet extends HttpServlet{

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		//Leer los parámetros del formulario html
		String usuario = request.getParameter("usuario");
		String password = request.getParameter("password");
		System.out.println("Usuario: " + usuario);
		System.out.println("Password: " + password);
		PrintWriter out = response.getWriter();
		out.print("<html>");
		out.print("<body>");
		out.print("El parámetro usuario es: " + usuario);
		out.print("<br>");
		out.print("El parámetro password es: " + password);
		out.print("</body>");
		out.print("</html>");
		out.close();
	}
}
