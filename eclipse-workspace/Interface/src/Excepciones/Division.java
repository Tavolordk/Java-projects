package Excepciones;

public class Division {

	private int numerador;
	private int denominador;
	
	public Division (int numerador, int denominador) throws OperacionExcepcion
	{
		if(this.denominador == 0)
		{
			throw new OperacionExcepcion("Denominador igual a cero, no puede realizarse");
		}
		
		this.numerador = numerador;
		this.denominador = denominador;
	}
	
	public void visualizarOperacion()
	{
		System.out.println("El resultado de la división es: " + (this.numerador/this.denominador));
	}
}
