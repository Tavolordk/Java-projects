package generics;

public class ManejoGenericoTest {

	public static void main(String [] args)
	{
		ClaseGenerica<Integer> objetoInt = new ClaseGenerica<Integer>(15);
		objetoInt.obtenerTipo();
		System.out.println(objetoInt.toString());
		
		ClaseGenerica<String> objetoString = new ClaseGenerica<String>("Tavo");
		objetoString.obtenerTipo();
		System.out.println(objetoString.toString());
	}
}
