package Clase.abstracta;

public class Rectangulo extends FiguraGeometrica {
	
	public Rectangulo(String tipoFigura)
	{
		super(tipoFigura);
	}
	
	public void dibujar()
	{
		System.out.println("Aqu� debe dibujar un : " + this.getClass().getSimpleName());
	}

}
