package n1;

public class SobrecargaConstructores {

	public static void main(String [] args)
	{
		Persona p = new Persona("Tavo", 23);
		System.out.println(p);
		
		Empleado e = new Empleado("Pedro", 25, 9000);
		System.out.println(e);
	}
}
