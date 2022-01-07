package generics;

public class ClaseGenerica <T> {
	//Definimos la variable generica
	T objeto;
	//Constructor que inicializa el tipo a utilizar
	public ClaseGenerica(T objeto)
	{
		this.objeto = objeto;
	}
	
	public void obtenerTipo()
	{
		System.out.println("El tipo es: " + objeto.getClass().getSimpleName());
	}

	@Override
	public String toString() {
		return "El contenido es: " + objeto;
	}

}
