package figura;

public class Encapsulado {
	private String nombre;
	private double sueldo;
	private boolean eliminado;
	
	public Encapsulado(String nombre, double sueldo, boolean eliminado)
	{
		this.nombre = nombre;
		this.eliminado = eliminado;
		this.sueldo = sueldo;
	}
	
   public String getNombre()
   {
	return this.nombre;
   }
   
   public void setNombre(String nombre)
   {
	   this.nombre = nombre;
   }

public double getSueldo() {
	return this.sueldo;
}

public void setSueldo(double sueldo) {
	this.sueldo = sueldo;
}

public boolean isEliminado() {
	return this.eliminado;
}

public void setEliminado(boolean eliminado) {
	this.eliminado = eliminado;
}
   
@Override
public String toString() {
	return "Encapsulado [nombre=" + nombre + ", sueldo=" + sueldo + ", eliminado=" + eliminado + "]";
}

}
