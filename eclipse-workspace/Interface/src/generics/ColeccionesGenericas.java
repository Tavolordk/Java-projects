package generics;

import java.util.*;
public class ColeccionesGenericas {

	public static void main(String [] args)
	{
		List<String> miLista = new ArrayList<String>();
		miLista.add("Tavo");
		miLista.add("Olea");
		miLista.add("Pérez");
		imprimir(miLista);
		
		Set<Integer> miSet = new HashSet<Integer>();
		miSet.add(4);
		miSet.add(6);
		miSet.add(8);
		miSet.add(8);
		imprimir2(miSet);
		
		Map<String, Double> miMap = new HashMap<String, Double>();
		miMap.put("Chinga", (double) 1);
		miMap.put("tu", (double) 2);
		miMap.put("Madre", (double) 3);
		imprimir(miMap.keySet());
		imprimir3(miMap.values());
		
	}
	
	private static void imprimir(Collection <String> string)
	{
		for(String elemento: string)
		{
			System.out.println(elemento);
		}
	}
	
	private static void imprimir2(Collection <Integer> entero)
	{
		for(Integer elemento: entero)
		{
			System.out.println(elemento);
		}
	}
	
	private static void imprimir3(Collection <Double> doble)
	{
		for(Double elemento: doble)
		{
			System.out.println(elemento);
		}
	}
}
