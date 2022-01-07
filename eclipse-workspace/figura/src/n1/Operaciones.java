package n1;

public class Operaciones {

	public static int sumar(int a, int b)
	{
		System.out.println("Este es el método 1(int ambos)");
		return a + b;
	}
	
	public static double sumar(double a, double b)
	{
		System.out.println("Este es el método 2(double ambos)");
		return a + b;
	}
	
	public static double sumar(int a, double b)
	{
		System.out.println("Este es el método 3(int y double)");
		return a + b;
	}
	
	public static double sumar(double a, int b)
	{
		System.out.println("Este es el método 4(double e int)");
		return a + b;
	}
}
