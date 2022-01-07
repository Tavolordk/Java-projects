package figura;
import java.util.*;
public class numeros {
      public static void main(String [] args)
      {
    	  int numero1;
    	  int numero2;
    	  Scanner scanner = new Scanner(System.in);
    	  System.out.println("Proporciona el número1: ");
    	  numero1=Integer.parseInt(scanner.nextLine());
    	  System.out.println("Proporciona el número2: ");
    	  numero2=Integer.parseInt(scanner.nextLine());
    	  var resultado=(numero1>numero2)? numero1 : numero2;
    	  System.out.println("El número mayor es: " + resultado);
      }
}
