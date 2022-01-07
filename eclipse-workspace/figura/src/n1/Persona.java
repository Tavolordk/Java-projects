package n1;

public class Persona {

	private int idPersona;
	private String nombre;
	private int edad;
	private static int contadorPersona;
	
	private Persona()
	{
		this.idPersona = ++contadorPersona;
	}
	
	public Persona(String nombre, int edad)
	{
		this();
		this.nombre = nombre;
		this.edad = edad;
	}
	
	public int getIdPersona() {
		return idPersona;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}

	public static int getContadorPersona() {
		return contadorPersona;
	}

	@Override
	public String toString() {
		return "Persona [idPersona=" + idPersona + ", nombre=" + nombre + ", edad=" + edad + "]";
	}
	
}
