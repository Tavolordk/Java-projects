package web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
@WebServlet("/Resultado")
public class Servlet extends HttpServlet{

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		String usuario = request.getParameter("usuario");
		String password = request.getParameter("password");
		String tecnologias [] = request.getParameterValues("tecnologia");
		String genero = request.getParameter("genero");
		String ocupacion = request.getParameter("ocupacion");
		String musica [] = request.getParameterValues("musica");
		String comentario = request.getParameter("comentarios");
		
		out.print("<html>");
		out.print("<head>");
		out.print("<title>Resultado del formulario</title>");
		out.print("</head>");
		out.print("<body>");
		out.print("<h1>Parámetros procesados por el servlet:</h1>");
		out.print("<table border='1'>");
		
		out.print("<tr>");
		out.print("<td>");
		out.print("usuario");
		out.print("</td>");
		out.print("<td>");
		out.print(usuario);
		out.print("</td>");
		out.print("</tr>");
		
		out.print("<tr>");
		out.print("<td>");
		out.print("contraseña");
		out.print("</td>");
		out.print("<td>");
		out.print(password);
		out.print("</td>");
		out.print("</tr>");
		
		
		out.print("<tr>");
		out.print("<td>");
		out.print("tecnologías");
		out.print("</td>");
		out.print("<td>");
		for(String tecnologia:tecnologias)
		{
			out.print(tecnologia);
			out.print(" / ");
		}
		out.print("</td>");
		out.print("</tr>");
		
		out.print("<tr>");
		out.print("<td>");
		out.print("género");
		out.print("</td>");
		out.print("<td>");
		out.print(genero);
		out.print("</td>");
		out.print("</tr>");
		
		out.print("<tr>");
		out.print("<td>");
		out.print("ocupación");
		out.print("</td>");
		out.print("<td>");
		switch(ocupacion)
		{
		case "1" :
			out.print("Estudiante");
			break;
		case "2" :
			out.print("Licenciado");
			break;
		case "3" :
			out.print("Profesor");
			break;
		case "4" :
			out.print("Jubilado");
			break;
		case "5" :
			out.print("Nini");
			break;
		default:
			out.print("No se ha seleccionado ninguna opción");
		}
		out.print("</td>");
		out.print("</tr>");
		
		out.print("<tr>");
		out.print("<td>");
		out.print("música favorita");
		out.print("</td>");
		out.print("<td>");
		if(musica!=null) {
		for(String musicas:musica)
		{
			out.print(musicas);
			out.print(" / ");
		}
		}
		else
		{
			out.print("Música no seleccionada");
		}
		out.print("</td>");
		out.print("</tr>");
		
		out.print("<tr>");
		out.print("<td>");
		out.print("comentarios");
		out.print("</td>");
		out.print("<td>");
		out.print(comentario);
		out.print("</td>");
		out.print("</tr>");
		
        out.print("</table>");
		out.print("</body>");
		out.print("</html>");
		out.close();
}
}
