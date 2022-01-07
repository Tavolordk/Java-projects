/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package holamundo;
import java.util.Scanner;

/**
 *
 * @author Oscar
 */
public class HolaMundo {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int edad;
       // Scanner Lee_Teclado;
        String nombre;
        Scanner Lee_Teclado = new Scanner(System.in);
        System.out.println("ingresa tu edad: ");
        edad = Lee_Teclado.nextInt();
        
        System.out.println("Ingresa tu nombre: ");        
        nombre=Lee_Teclado.nextLine();
        System.out.println("hola "+nombre+" y tu edad es "+edad);
    }
    
}
