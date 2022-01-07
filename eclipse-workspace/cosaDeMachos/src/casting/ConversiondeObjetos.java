package casting;

public class ConversiondeObjetos {

	public static void main(String [] args)
	{
		Empleado empleado;
		empleado = new Escritor("Cioran", 45000, TipoEscritura.CLASICO);
		System.out.println(empleado.obtenerDetalles());
		
		//Casting para acceder a metodos que no tienen en comun los objetos
		Escritor escritor = (Escritor) empleado;
		System.out.println(escritor.getTipoDeEscrituraEnTexto());
		System.out.println("Otra forma de casting: " + ((Escritor) empleado).getTipoDeEscrituraEnTexto());
	
	    empleado = new Gerente("Tavo", 15000.45, "Sistemas");
	    System.out.println(empleado.obtenerDetalles());
	    System.out.println(((Gerente) empleado).getDepartamento());
	}
}
