package Gus66.webapp;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/Resultado")
public class Servlet extends HttpServlet{

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		String usuarioOk = "Tavusia";
		String passwordOk = "456610456";
		String usuario = request.getParameter("usuario");
		String password = request.getParameter("password");
		PrintWriter out = response.getWriter();
		
		if(usuarioOk.equals(usuario) && passwordOk.equals(password))
		{
			out.print("<html>");
			out.print("<body>");
			out.print("<h1>");
			out.print("Datos correctos");
			out.print(usuario);
			out.print(password);
			out.print("</h1>");
			out.print("</body>");
			out.print("</html>");
		}
		
		else
		{
			response.sendError(response.SC_UNAUTHORIZED, "Las credenciales son incorrectas");
		}
		
		out.close();
	}

}
