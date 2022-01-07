package cosaDeMachos;

import java.util.Date;

public class Producto1 {

	private int idProducto;
	private String nombre;
	private double precio;
	private static int contadorProducto;
	private Date fecha;
	private Producto1()
	{
		this.idProducto = ++contadorProducto;
	}
	
	public Producto1(String nombre, double precio, Date fecha)
	{
		this();
		this.nombre = nombre;
		this.precio = precio;
		this.fecha = fecha;
	}
	
	public int getIdProducto() {
		return idProducto;
	}


	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getPrecio() {
		return precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}

	public static int getContadorProducto() {
		return contadorProducto;
	}
	
	

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	@Override
	public String toString() {
		return "Producto1 [idProducto=" + idProducto + ", nombre=" + nombre + ", precio=" + precio + " fecha de orden: "+ fecha +"]";
	}

   
}