package n2;

public class Personita {

	private final int idPersona;
	private String nombre;
	private static int contadorPersona;
	
	Personita(String nombre)
	{
		this.idPersona = ++contadorPersona;
		this.nombre = nombre;
	}
	
	public String getNombre(String nombre)
	{
		return this.nombre;
	}
	
	public void setNombre(String nombre)
	{
		this.nombre = nombre;
	}

	@Override
	public String toString() {
		return "Personita [idPersona=" + idPersona + ", nombre=" + nombre + "]";
	}
	
}
