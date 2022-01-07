package cosaDeMachos;
public class Orden {
	private int idOrden;
	private Producto1 productos[];
	private static int contadorOrdenes;
	private int contadorProductos;
	private static final int MAX_PRODUCTOS = 10;
	public Orden()
	{
		this.idOrden = ++contadorOrdenes;
		productos = new Producto1[MAX_PRODUCTOS];
	}
	
	public void agregarProducto(Producto1 producto)
	{
		if(this.contadorProductos < MAX_PRODUCTOS)
		{
		productos[this.contadorProductos++] = producto;
	}
		else
		{
			System.out.println("Se superó el máximo de productos: " + MAX_PRODUCTOS);
		}

}
	public double calcularTotal()
	{
		double total=0;
		for(int i=0;i<contadorProductos;i++)
		{
			Producto1 producto = this.productos[i];
			total += producto.getPrecio();
		}
		return total;
	}
	
	public void mostrarOrden()
	{
		System.out.println("Orden #: " + this.idOrden);
		System.out.println("Total de la orden: $" + this.calcularTotal());
		System.out.println("Productos de la orden: ");
		for(int i=0; i<this.contadorProductos;i++)
		{
			System.out.println(productos[i]);
		}
	}
}
