package figura;

public class PalabraThis {

	public static void main(String [] args)
	{
		Persona1 person = new Persona1("Juan");
	}
}

class Persona1
{
	String nombre;
	
	Persona1 (String nombre)
	{
		this.nombre = nombre;
		System.out.println(this);
		Imprimir i = new Imprimir();
		i.imprimir(this);
	}
}

class Imprimir
{
	public void imprimir(Persona1 p)
	{
		System.out.println("Imprimir argumento persona: " + p);
		System.out.println("Impresión del objeto actual (this) " + this);
	}
}