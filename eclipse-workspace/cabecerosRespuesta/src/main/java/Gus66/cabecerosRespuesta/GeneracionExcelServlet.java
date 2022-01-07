package Gus66.cabecerosRespuesta;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/GeneracionExcelServlet")
public class GeneracionExcelServlet extends HttpServlet {

	protected void doGet(HttpServletResponse response, HttpServletRequest request) throws IOException
	{
		//Indicamos el tipo de respuesta al navegador
		response.setContentType("application/vmd.ms-excel");
		response.setHeader("Content Disposition", "attachment;filename-culeame.xls");
		//Indicamos que no guarde cache al navegador
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-store");
		response.setDateHeader("Expires", -1);
		//Desplegamos la información al cliente
		PrintWriter out = response.getWriter();
		out.println("\tValores");
		out.println("\t1");
		out.println("\t2");
		out.println("Total\t=SUMA(b2:b3)");
		out.close();
	}
}
