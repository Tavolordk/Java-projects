package Clase.abstracta;

public class EjemploClasesAbstractas {
	
	public static void main(String [] args)
	{
		FiguraGeometrica rectangulo = new Rectangulo(" ");
		rectangulo.dibujar();
		
		FiguraGeometrica triangulo = new Triangulo(" ");
		triangulo.dibujar();
		
		FiguraGeometrica Circulo = new Circulo(" ");
		Circulo.dibujar();
	}

}
