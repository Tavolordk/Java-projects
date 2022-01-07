package p2;

import publico.*;

public class Clase3 extends Clase1 {

	public Clase3()
	{
		super("hola", "padre");
		new Clase1();
		//new Clase1("Hola", "Tavo");
		//new Clase1("amame", "tavo", "por favor");
		
	}
	
	public void pruebaClase3()
	{
		Clase1 c1 = new Clase1();
		System.out.println("atributo publico: " + c1.atributoPublico);
		System.out.println("atributo protegido: " + atributoProtegido);
		//System.out.println("atributo default: " + c1.atributoDefault);
		//System.out.println("atributo privado: " + c1.atributoPrivado);
		
		System.out.println(" ");
		System.out.println("Método publico: " + c1.metodoPublico());
		System.out.println("Método Protegido: " + metodoProtegido());
		//System.out.println("Método default: " + c1.metodoDefault());
	}
	
	public static void main(String [] args)
	{
		Clase3 c3 = new Clase3();
		c3.pruebaClase3();
	}
	
}
