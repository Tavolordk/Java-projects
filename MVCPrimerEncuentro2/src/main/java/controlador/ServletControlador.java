package controlador;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import modelo.Rectangulo;


@WebServlet("/ServletControlador")
public class ServletControlador extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		//1-Procesamos parámetros
		String accion = request.getParameter("accion");
		//2-Creamos los javabeans
		Rectangulo recRequest = new Rectangulo(3,2);
		Rectangulo recSesion = new Rectangulo(7,2);
		Rectangulo recAplication = new Rectangulo(5,3);
		//3-Agregamos el javabean a algun alcance
		//Revisamos la acción proporcionada
		if("agregaVariables".equals(accion))
		{
			//Alcance Request:
			request.setAttribute("rectanguloRequest", recRequest);
			//Alcance Session:
			HttpSession sesion = request.getSession();
			sesion.setAttribute("rectanguloSesion", recSesion);
			//Alcance application
			ServletContext application = this.getServletContext();
			application.setAttribute("rectanguloApplication", recAplication);
			//Agregamos un mensaje
			request.setAttribute("mensaje", "Las variables fueron agregadas");
			//Redireccionamos al jsp de index
			request.getRequestDispatcher("index.jsp").forward(request, response);
		}
		else if("listarVariables".equals(accion))
		{
			//4-Redireccionar al jsp que despliega las variables
			request.getRequestDispatcher("WEB-INF/alcanceVariables.jsp").forward(request, response);
		}
		else
		{
			//4-Redireccionamos a la pagina de inicio
			request.setAttribute("mensaje", "Acción no proporcionada o desconocida");
			request.getRequestDispatcher("index.jsp").forward(request, response);
		}
	}
	
}
