package nuevaVersion23;
import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

@Named
@RequestScoped
public class Bean {

	private String saludo="Hola marica";
	private String nombre;

	public void saludarPersona()
	{
		String saludoNuevo="Un placer saludarte" + getSaludo();
		setSaludo(saludoNuevo);
	}
	
	public String getSaludo() {
		return saludo;
	}

	public void setSaludo(String saludo) {
		this.saludo = saludo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
}
