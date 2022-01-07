package web;

import javax.servlet.http.*;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;

@WebServlet(name="HolaMundo", urlPatterns= {"/HolaMundo"})
public class HolaMundo extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("Hola mundo desde Servlets");
	}
}
