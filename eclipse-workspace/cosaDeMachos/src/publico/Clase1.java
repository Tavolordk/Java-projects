package publico;

public class Clase1 {
	//Definición de atributos
	public String atributoPublico = "valor atributo publico";
	protected String atributoProtegido = "valor atributo protegido";
	String atributoDefault = "valor atributo default o package";
	private String atributoPrivado = "valor atributo privado";

	//Constructores
	public Clase1()
	{
		System.out.println("Este es constructor vacío");
	}
	
	public Clase1(String texto)
	{
		//Constructor publico con un argumento
		System.out.println("Texto: " + texto);
	}
	
	protected Clase1(String texto1, String texto2)
	{
		System.out.println("Texto1: " + texto1 + " texto2: " + texto2);
	}
	
	Clase1(String texto1, String texto2, String texto3)
	{
		System.out.println("Texto1: " + texto1 + " texto2: " + texto2 + " texto3: " + texto3);
	}
	
	private Clase1(String texto1, String texto2, String texto3, String texto4)
	{
		System.out.println("Constructor privado");
	}
	
	//Definir métodos
	public String metodoPublico()
	{
		return "metodo publico";
	}
	
	protected String metodoProtegido()
	{
		return "metodo protegido";
	}
	
	String metodoDefault()
	{
		return "metodo default o package";
	}
	
	private String metodoPrivado()
	{
		return "metodo privado";
	}
}
