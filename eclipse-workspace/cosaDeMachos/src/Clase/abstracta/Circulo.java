package Clase.abstracta;

public class Circulo extends FiguraGeometrica {

	public Circulo(String tipoFigura)
	{
		super(tipoFigura);
	}
	
	public void dibujar()
	{
		System.out.println("Aqu� debe dibujar un : " + this.getClass().getSimpleName());
	}
}
