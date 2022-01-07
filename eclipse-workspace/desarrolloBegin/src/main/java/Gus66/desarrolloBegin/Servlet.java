package Gus66.desarrolloBegin;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
@WebServlet("/ServletHeader")
public class Servlet extends HttpServlet{

	protected void doGet (HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
        String metodoHttp = request.getMethod();
        out.print("<html>");
		out.print("<head>");
		out.print("<title>Headers Http</title>");
		out.print("</head>");
		out.print("<body>");
		out.print("<h1>Prueba de headers http</h1>");
		out.print("Método http ejecutado: " + metodoHttp);
		
		String uri = request.getRequestURI();
		out.print("Uri solicitada: " + uri);
		@SuppressWarnings("rawtypes")
		Enumeration cabeceros = request.getHeaderNames();
		while(cabeceros != null)
		{
			String nombreCabeceros = (String) cabeceros.nextElement();
			out.print(nombreCabeceros);
			out.print(request.getHeader(nombreCabeceros));
		}
		
		out.print("</body>");
		out.print("</html>");
		out.close();
	}
}
