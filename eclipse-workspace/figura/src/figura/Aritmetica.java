package figura;

public class Aritmetica {
	int a,b;
	
	public Aritmetica()
	{
		this.a=5;
		this.b=4;
		System.out.println("Ejecutando constructor vacío :D ");
	}
	
	public Aritmetica(int a, int b)
	{
		System.out.println("Ejecutando constructor 2 ");
		this.a=a;
		this.b=b;
	}

	public int sumar()
	{
		return this.a+this.b;
	}
	
	public int restar()
	{
		return this.a-this.b;
	}
	
	public int multiplicar()
	{
		return this.a*this.b;
	}
	
	public int dividir()
	{
		return this.a/this.b;
	}
}
