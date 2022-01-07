package nuevo;
import java.util.*;
public class EjemploHerencia {

	public static void main(String [] args)
	{
		Empleado e1 = new Empleado("Tavo", 9000);
		e1.setEdad(23);
		e1.setDireccion("Zacualpan, GRO");
		e1.setGenero('M');
		System.out.println(e1);
		
		Cliente c1 = new Cliente(new Date(), true);
		c1.setNombre("Carlos");
		c1.setEdad(14);
		c1.setGenero('F');
		c1.setDireccion("Atoyac");
		System.out.println(c1);
	}
}
