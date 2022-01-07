package figura;
import java.util.*;
public class rectangulo {

	public static void main(String [] args)
	{
		int largo, ancho;
		int area;
		int perimetro;
		Scanner escanear = new Scanner(System.in);
		System.out.println("Proporciona el largo: ");
		largo = Integer.parseInt(escanear.nextLine());
		System.out.println("Proporciona el ancho: ");
		ancho = Integer.parseInt(escanear.nextLine());
		area=largo * ancho;
		perimetro=(2*(largo + ancho));
		System.out.println("Área: " + area);
		System.out.println("Perímetro: " + perimetro);
	}
}
