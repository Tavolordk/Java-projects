package Gus66.CookieContador;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ContadorServlet")
public class ContadorServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		//Declaramos la variable contador
		int contador = 0;
		//Verificamos si existe la cooki contadorVisitas
		Cookie [] cookies = request.getCookies();
		if(cookies!=null)
		{
			for(Cookie c: cookies)
			{
				if(c.getName().equals("contadorVisitas"))
				{
					contador = Integer.parseInt(c.getValue());
				}
			}
		}
		
		//Incrementamos el contador en uno
		contador++;
		//Agregamos la respuesta al navegador
		Cookie c = new Cookie("contadorVisitas",Integer.toString(contador));
		//Se almacenará por 1 hora
		c.setMaxAge(3600);
		response.addCookie(c);
		//Mandamos la respuesta al navegador
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print("Visita número: " + contador);
	}
}
