/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
Esta clase recibe como parametro un entero el cual determina el número de veces que 
se ejecutará la estructura de control.
El metodo no devuelve parametros y recibe un numero entero.
*/
package ejemplos1;

/**
 *
 * @author Oscar
 */
public class Ejemplo_For {
    protected Ejemplo_For(int nCiclos)
            {
                //Ejemplo Estructura de control FOR
                if (nCiclos>0)
                for (int i=0;i<=nCiclos;i++)
                {
                    System.out.println("Iteración "+i);
                }
            }
}
