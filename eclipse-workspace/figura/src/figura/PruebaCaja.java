package figura;

public class PruebaCaja {

	public static void main(String [] args)
	{
		int A = 8;
		int B = 2;
		int C = 6;
		Caja objeto1 = new Caja();
		System.out.println("El volumenen es: " + objeto1.calcularVolumen());
		Caja objeto2 = new Caja(A,B,C);
		System.out.println("El volumen es: " + objeto2.calcularVolumen());
	}
}
