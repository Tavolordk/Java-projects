package figura;

public class PruebaAritmetica {

	public static void main(String[] args)
	{
		int operandoA = 6;
		int operandoB = 2;
		
		Aritmetica objeto1 = new Aritmetica(operandoA, operandoB);
		System.out.println("OperandoA = " + operandoA);
		System.out.println("OperandoB = " + operandoB);
		System.out.println("\nResultado suma = " + objeto1.sumar());
		System.out.println("\nResultado resta = " + objeto1.restar());
		System.out.println("\nResultado multiplicar = " + objeto1.multiplicar());
		System.out.println("\nResultado dividir = " + objeto1.dividir());
	}
}
