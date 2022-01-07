package figura;

public class PruebaEncapsular {
	public static void main(String [] args)
	{
		Encapsulado persona = new Encapsulado("Juan", 5000, false);
		System.out.println("El nombre es: " + persona.getNombre());
		System.out.println("Su sueldo es: " + persona.getSueldo());
		System.out.println("¿La persona ha sido borrada? : " + persona.isEliminado());
		System.out.println("Persona : " + persona.toString());
		System.out.println("Persona llamada implicita: " + persona);
		persona.setNombre("Tavo");
		persona.setSueldo(6000);
		persona.setEliminado(true);
		System.out.println("El nombre es: " + persona.getNombre());
		System.out.println("Su sueldo es: " + persona.getSueldo());
		System.out.println("¿La persona ha sido borrada? : " + persona.isEliminado());
		System.out.println("Persona 2 : " + persona.toString());
		System.out.println("Persona 2 llamada implicita: " + persona);
	}
}
