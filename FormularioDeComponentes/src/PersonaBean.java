import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

@Named
@RequestScoped
public class PersonaBean {

	private String nombre;//campo
	private int edad;//campo
	private String descripcion;//area de texto
	private String dia;//combo de seleccion
	private String genero;//RadioButtons
	private String [] idioma;//CheckBox
	private List<String> profesionList;//Lista de seleccion multiple
	private List<String> profesionSeleccionada;//Lista para almacenar los elementos seleccionados
    
	public PersonaBean()
	{
		profesionList=new ArrayList<String>();
		profesionList.add("Bachiller");
		profesionList.add("Básica");
		profesionList.add("Tecnologo");
		profesionList.add("Tecnico");
		profesionList.add("Profesional");
		profesionList.add("Especialista");
		profesionList.add("Maestria");
		profesionList.add("Doctorado");
	}
	
	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getDia() {
		return dia;
	}

	public void setDia(String dia) {
		this.dia = dia;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public String[] getIdioma() {
		return idioma;
	}

	public void setIdioma(String[] idioma) {
		this.idioma = idioma;
	}

	public List<String> getProfesionList() {
		return profesionList;
	}

	public void setProfesionList(List<String> profesionList) {
		this.profesionList = profesionList;
	}

	public List<String> getProfesionSeleccionada() {
		return profesionSeleccionada;
	}

	public void setProfesionSeleccionada(List<String> profesionSeleccionada) {
		this.profesionSeleccionada = profesionSeleccionada;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
}
