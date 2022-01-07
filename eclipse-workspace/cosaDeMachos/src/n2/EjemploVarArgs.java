package n2;

public class EjemploVarArgs {

	public static void main(String [] args)
	{
		imprimirNumeros(12,45,78,9,60);
		System.out.println(" ");
		variosParametros("Juan", true, 12,34,56,7);
	}

	private static void variosParametros(String string, boolean b, int...numeros ) {
		// TODO Auto-generated method stub
		System.out.println(string + " " + b);
		for(int i=0;i<numeros.length;i++)
		{
			System.out.println(numeros[i]);
		}
		
	}

	private static void imprimirNumeros(int... numeros) {
		// TODO Auto-generated method stub
		for(int i=0; i<numeros.length; i++)
		{
			System.out.println(numeros[i]);
		}
		
	}
}
