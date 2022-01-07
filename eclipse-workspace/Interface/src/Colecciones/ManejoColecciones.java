package Colecciones;

import java.util.*;


public class ManejoColecciones {

	public static void main(String [] args)
	{
		List miLista = new ArrayList();
		miLista.add("Tavo");
		miLista.add(2);
		miLista.add(3);
		miLista.add(3);
		imprimir(miLista);
		
		Set miset = new HashSet();
		miset.add("100");
		miset.add("200");
		miset.add("300");
		miset.add("300");
		imprimir(miset);
		
		Map miMapa = new HashMap();
		miMapa.put("Tavo", "Jefe");
		miMapa.put("Octavio", "IT");
		miMapa.put("Gus", "PM");
		miMapa.put("Gus", "PM");
		imprimir(miMapa.keySet());
		imprimir(miMapa.values());
		
	}
	
	private static void imprimir(Collection<Integer> coleccion)
	{
		for(Object elemento: coleccion)
		{
			System.out.print("elemento: "+ elemento + " ");
		}
	}
}
