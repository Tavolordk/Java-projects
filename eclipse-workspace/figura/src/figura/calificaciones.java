package figura;
import java.util.*;
public class calificaciones {
   public static void main(String [] args)
   {
	
	   Scanner scanner = new Scanner(System.in);
	   System.out.println("Proporciona un valor entre 0 y 10");
	   double num = Double.parseDouble(scanner.nextLine());
	   if (num >= 9 && num <= 10)
	   {
		   System.out.println("A");
	   }
	   else if (num < 9 && num >= 8 )
	   {
		   System.out.println("B");
	   }
	   else if (num < 8 && num >= 7 )
	   {
		   System.out.println("C");
	   }
	   else if (num < 7 && num >= 6 )
	   {
		   System.out.println("D");
	   }
	   else if (num < 6 && num >= 0 )
	   {
		   System.out.println("F");
	   }
	   else
	   {
		   System.out.println("Valor desconocido...");
	   }
    }
}
