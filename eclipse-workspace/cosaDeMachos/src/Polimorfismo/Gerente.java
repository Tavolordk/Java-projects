package Polimorfismo;

public class Gerente extends Empleado {


	private String departamento;
	
	public Gerente(String nombre, double sueldo, String departamento)
	{
		super(nombre, sueldo);
		this.departamento = departamento;
	}
	
	//Sobreescribir metodo heredado
	public String obtenerDetalles()
	{
		return super.obtenerDetalles() + " Departamento: " + this.departamento;
	}

	public String getDepartamento() {
		return departamento;
	}

	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
	
}
