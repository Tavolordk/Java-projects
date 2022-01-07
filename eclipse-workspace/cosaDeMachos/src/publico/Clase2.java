package publico;

public class Clase2 {

	public Clase2()
	{
		new Clase1();
		new Clase1("Hola", "Tavo");
		new Clase1("amame", "tavo", "por favor");
	}
	
	public void pruebaClase2()
	{
		Clase1 c1 = new Clase1();
		System.out.println("atributo publico: " + c1.atributoPublico);
		System.out.println("atributo protegido: " + c1.atributoProtegido);
		System.out.println("atributo default: " + c1.atributoDefault);
		//System.out.println("atributo privado: " + c1.atributoPrivado);
		
		System.out.println(" ");
		System.out.println("Método publico: " + c1.metodoPublico());
		System.out.println("Método Protegido: " + c1.metodoProtegido());
		System.out.println("Método default: " + c1.metodoDefault());
	}
	
	public static void main(String [] args)
	{
		Clase2 c2 = new Clase2();
		c2.pruebaClase2();
	}
}
