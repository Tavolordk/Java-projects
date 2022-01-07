package publico;

import Sobreescritura.*;

public class EjemploSobreescritura {
	
	public static void main(String [] args)
	{
		Empleado e1 = new Empleado("Tavo", 2435.58);
		System.out.println(e1.obtenerDetalles());
		
		Gerente g1 = new Gerente("Octavio", 2400, "IT");
		System.out.println(g1.obtenerDetalles());
	}

}
