package excepcion;

import datos.*;

public class ManejoExcepciones2 {

	public static void main(String [] args)
	{
		AccesoDatos datos = new ImplementacionMySql();
		datos.simularError(true);
		ejecutarDatos(datos, "listar");
		
		AccesoDatos datos2 = new ImplementacionOracle();
		datos2.simularError(false);
		ejecutarDatos(datos2, "insertar");
	}
	
	public static void ejecutarDatos(AccesoDatos datos, String accion)
	{
		if("listar".equals(accion))
		{
			try {
				datos.listar();
			} catch (LecturaDatosEx e) {
				// TODO Auto-generated catch block
				System.out.println("Error lectura");
				e.printStackTrace();
			}
			catch (AccesoDatosEx e) {
				// TODO Auto-generated catch block
				System.out.println("Error acceso a datos");
				e.printStackTrace();
			}
			
			catch (Exception e) {
				// TODO Auto-generated catch block
				System.out.println("Error general");
				e.printStackTrace();
			}
			finally
			{
				System.out.println("Ejecutando finally");
			}
		}
		
		else if("insertar".equals(accion))
		{
			try {
				datos.insertar();
			} catch (EscrituraDatosEx e) {
				// TODO Auto-generated catch block
				System.out.println("Error escritura");
				e.printStackTrace();
			}
			catch (AccesoDatosEx e) {
				// TODO Auto-generated catch block
				System.out.println("Error acceso a datos");
				e.printStackTrace();
			}
			
			catch (Exception e) {
				// TODO Auto-generated catch block
				System.out.println("Error general");
				e.printStackTrace();
			}
			finally
			{
				System.out.println("Ejecutando finally");
			}
		}
		
		else
		{
			System.out.println("No se proporciono ninguna acción conocida");
		}
	}
}
