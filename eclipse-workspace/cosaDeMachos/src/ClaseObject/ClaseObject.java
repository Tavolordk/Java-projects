package ClaseObject;



public class ClaseObject {

	public static void main(String [] args)
	{
		Empleado emp1 = new Empleado("Tavo", 3000);
		Empleado emp2 = new Empleado("Tavo", 3000);
		System.out.println(emp1 + ": " + emp2 + "¿Los objetos son iguales?: " + (emp1==emp2));
		
		compararObjetos(emp1, emp2);
	
	}
	
	private static void compararObjetos(Empleado emp1, Empleado emp2)
	{
		System.out.println(emp1 + " : " + emp2);
		
		//Revision por referencia
		
		if(emp1==emp2)
		{
			System.out.println("Los objetos tienen la misma referencia en memoria");
		}
		else
		{
			System.out.println("Los objetos tienen distinta referencia en memoria");
		}
		
		//Revision metodo equals
		if (emp1.equals(emp2))
		{
			System.out.println("Los objetos tienen el mismo contenido");
		}
		else
		{
			System.out.println("Los objetos no tienen el mismo contenido");
		}
		
		//revisamos el metodo hashcode
		if(emp1.hashCode() == emp2.hashCode())
		{
			System.out.println("Los objetos tienen el mismo codigo hash" + " emp1 = " + emp1.hashCode() + " emp2 = " + emp2.hashCode());
		}
		else
		{
			System.out.println("Los objetos no tienen el mismo codigo hash" + " emp1 = " + emp1.hashCode() + " emp2 = " + emp2.hashCode());
		}
	}
}
