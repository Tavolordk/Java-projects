package n2;

public class AutoboxingUnboxing {

	public static void main(String [] args)
	{
		//Autoboxing convierte un tipo primitivo a un tipo object
		Integer enteroOb = 10;
		System.out.println("Entero: " + enteroOb.intValue());
		
		//Unboxing convierte un tipo object a primitivo
		int entero = enteroOb;
		System.out.println(entero);
		
		Float floatObject = 12.34F;
		float flotante = floatObject;
		
		System.out.println(floatObject.intValue() + " " + flotante);
		
		//Listado de clases envolventes 
		//Boolean, Byte, Integer, Float, Double, Character, Short, Long, 
		
	}
}
