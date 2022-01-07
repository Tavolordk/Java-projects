import java.util.Scanner;
public class tarea2 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        String nombre;
        int id;
        double precio;
        char simbolo;
        boolean envioGratuito;
        var scanear = new Scanner(System.in);
        System.out.println("Proporciona el nombre: ");
        nombre = scanear.nextLine();
        System.out.println("Proporciona el ID: ");
        id = Integer.parseInt(scanear.nextLine());
        System.out.println("Proporciona el precio: ");
        precio = Double.parseDouble(scanear.nextLine());
        System.out.println("Proporciona el simbolo: ");
        simbolo = scanear.nextLine().charAt(0);
        System.out.println("Proporciona el envio gratuito: ");
        envioGratuito = Boolean.parseBoolean(scanear.nextLine());
        System.out.println(nombre);
        System.out.println(id);
        System.out.println("Precio: " + simbolo + precio);
        System.out.println("Envio gratuito: " + envioGratuito);
	}

}
