package Polimorfismo;

public class EjemploPolimorfismo {

	public static void main(String [] args)
	{
		Empleado e1 = new Empleado("Tavo", 50000);
		imprimirDetalles(e1);
		Gerente g1 = new Gerente("Octavio", 45600, "IT");
		imprimirDetalles(g1);
	}
	
	public static void imprimirDetalles(Empleado empleado)
	{
		System.out.println(empleado.obtenerDetalles());
		 
	}
}
