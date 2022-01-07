package Clase.abstracta;

public class Triangulo extends FiguraGeometrica {
	
	public Triangulo(String tipoFigura)
	{
		super(tipoFigura);
	}
	
	public void dibujar()
	{
		System.out.println("Aqu� debe dibujar un : " + this.getClass().getSimpleName());
	}

}
