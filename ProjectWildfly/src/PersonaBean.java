import javax.faces.bean.ManagedBean;

@ManagedBean
public class PersonaBean {

	private String nombre1;
	private String apellidos;
	private String telefono;
	private int edad;
	private String mensajeSaludo;
	
	public void saludo()
	{
		String mensaje="Hola es un placer conocerte " + getNombre1();
		setMensajeSaludo(mensaje);
	}
	
	public PersonaBean() {
		
	}

	public String getNombre1() {
		return nombre1;
	}

	public void setNombre1(String nombre1) {
		this.nombre1 = nombre1;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}

	public String getMensajeSaludo() {
		return mensajeSaludo;
	}

	public void setMensajeSaludo(String mensajeSaludo) {
		this.mensajeSaludo = mensajeSaludo;
	}

	@Override
	public String toString() {
		return "Tus datos son: Nombre: " + nombre1 + ", Apellidos: " + apellidos + ", Teléfono=" + telefono + ", Edad=" + edad;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	
	

}
