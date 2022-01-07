package calculadora;

import java.util.Scanner;

public class Calculadora {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("Proporciona el primer número: ");
		Scanner num1 = new Scanner(System.in);
		int a = num1.nextInt();
		System.out.println("Proporciona el segundo número: ");
		int b = num1.nextInt();
		int resultado = Operaciones.sumar(a, b);
        System.out.println("La suma es: " + resultado);
	}

}
