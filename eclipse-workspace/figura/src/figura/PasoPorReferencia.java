package figura;

public class PasoPorReferencia {

	public static void main(String [] args)
	{
		Referencia referencia = new Referencia();
		referencia.cambiarNombre("Juan");
		System.out.println("Nombre: " + referencia.obtenerNombre());
		
		modificarNombre(referencia);
		
		System.out.println("Nombre modificado: " + referencia.obtenerNombre());
	}

	private static void modificarNombre(Referencia referenciaArg) {
		referenciaArg.cambiarNombre("Carlos");
	}
}
