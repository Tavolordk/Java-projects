package p2;

import publico.Clase1;

public class Clase4 {

	public Clase4()
	{
		new Clase1();
	}
	
	public void pruebaClase4()
	{
		Clase1 c1 = new Clase1();
		System.out.println("atributo publico: " + c1.atributoPublico);
		//System.out.println("atributo protegido: " + atributoProtegido);
		//System.out.println("atributo default: " + c1.atributoDefault);
		//System.out.println("atributo privado: " + c1.atributoPrivado);
		
		System.out.println(" ");
		System.out.println("Método publico: " + c1.metodoPublico());
		//System.out.println("Método Protegido: " + metodoProtegido());
		//System.out.println("Método default: " + c1.metodoDefault());
	}
	
	public static void main(String [] args)
	{
		Clase4 c4 = new Clase4();
		c4.pruebaClase4();
	}
	
}
