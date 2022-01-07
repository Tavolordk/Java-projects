package other;

public class Arreglo {
	private String nombre;

	public Arreglo(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
	public String toString() {
		return "Arreglo [nombre=" + nombre + "]";
	}
	

}
