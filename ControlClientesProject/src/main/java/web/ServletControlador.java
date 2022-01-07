package web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import datos.ClienteDaoJDBC;
import dominio.Cliente;

@WebServlet("/ServletControlador")
public class ServletControlador extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		List<Cliente> clientes = new ClienteDaoJDBC().listar();
		System.out.println("clientes = " + clientes);
		request.setAttribute("clientes", clientes);
		request.getRequestDispatcher("clientes.jsp").forward(request, response);
	}
}
