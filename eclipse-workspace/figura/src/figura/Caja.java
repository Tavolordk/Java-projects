package figura;

public class Caja {
	int ancho, alto, profundo;
	public Caja()
	{
		System.out.println("Este es el constructor vac?o");
		this.ancho=3;
		this.alto=2;
		this.profundo=6;
	}
	
	public Caja(int a, int b, int c)
	{
		System.out.println("Este es el constructor con tres argumentos");
		this.ancho=a;
		this.alto=b;
		this.profundo=c;
	}
	
	int calcularVolumen()
	{
		return this.ancho * this.alto * this.profundo;
	}

}
