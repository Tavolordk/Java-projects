package Polimorfismo;

public class EjemploInstanceOf {

	public static void main(String [] args)
	{
		Empleado e1 = new Empleado("Tavo", 50000);
		determinaTipo(e1);
		Gerente g1 = new Gerente("Octavio", 45600, "IT");
		determinaTipo(g1);
	}
	
	public static void determinaTipo(Empleado empleado)
	{
		//Siempre instanciar desde la jerarquía más baja es decir hijos a padres
		if(empleado instanceof Gerente)
		{
			System.out.println(((Gerente) empleado).getDepartamento());
		}
		
		else if(empleado instanceof Empleado)
		{
			System.out.println(empleado.getNombre());
		}
		
		 
	}
}
