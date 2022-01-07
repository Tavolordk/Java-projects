package cosaDeMachos;
import java.util.*;
public class Ventas {

	public static void main(String [] args)
	{
		Producto1 p = new Producto1("Consolador", 3000, new Date());
		Producto1 p2 = new Producto1("Lubricante", 50, new Date());
		Producto1 p3 = new Producto1("Condón", 39, new Date());
		Producto1 p4 = new Producto1("Condón six pack ", 234, new Date());
		Producto1 p5 = new Producto1("Condón six pack ", 234, new Date());
		Producto1 p6 = new Producto1("Condón six pack ", 234, new Date());
		Producto1 p7 = new Producto1("Condón six pack ", 234, new Date());
		Producto1 p8 = new Producto1("Condón six pack ", 234, new Date());
		Producto1 p9 = new Producto1("Condón six pack ", 234, new Date());
		Producto1 p10 = new Producto1("Condón six pack ", 234, new Date());
		Producto1 p11 = new Producto1("Condón six pack ", 234, new Date());
		Orden o = new Orden();
		o.agregarProducto(p);
		o.agregarProducto(p2);
		o.agregarProducto(p3);
		o.agregarProducto(p4);
		o.agregarProducto(p5);
		o.agregarProducto(p6);
		o.agregarProducto(p7);
		o.agregarProducto(p8);
		o.agregarProducto(p9);
		o.agregarProducto(p10);
		o.mostrarOrden();
		
		Orden o2 = new Orden();
	}
}
