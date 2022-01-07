package n1;

public class SobrecargaMetodos {

	public static void main(String [] args)
	{
		System.out.println(Operaciones.sumar(9, 5));
		System.out.println(Operaciones.sumar(9.6, 5.3));
		System.out.println(Operaciones.sumar(9, 5.3));
		System.out.println(Operaciones.sumar(5.3, 9));
	}
}
