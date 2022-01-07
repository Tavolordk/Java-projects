/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejemplos1;

/**
 *
 * @author Oscar
 */
class Ejemplo_Case {
    Ejemplo_Case()
            {
                int numero=0;
                java.util.Scanner lee_teclado;
                System.out.println("Escriba un número");
                lee_teclado = new java.util.Scanner(System.in);
                numero=lee_teclado.nextInt();
                switch (numero)
                {
                    case 1:
                        System.out.print("Ejemplo For \n");                
                        System.out.print("Indique el número de iteraciones que desea realice el programa \n");                
                        Ejemplo_For desde = new Ejemplo_For(lee_teclado.nextInt());                
                        break;
                    case 2:
                        System.out.println("Ejemplo While ");
                        Ejemplo_While ejemplo = new Ejemplo_While();
                        break;
                    case 3:
                        Ejemplo_If Statement_If = new Ejemplo_If();
                        System.out.println("Ingrese un número ");
                        boolean salida=Statement_If.EjemploIf(lee_teclado.nextInt());
                        if (salida==false)
                            System.out.println("El usuario ingresó un número diferente a 1");
                        else
                            System.out.println("El usuario ingresó un número igual a 1");
                        break;
                    default: System.out.println("Opción no existente");
                }
    }
    
}
