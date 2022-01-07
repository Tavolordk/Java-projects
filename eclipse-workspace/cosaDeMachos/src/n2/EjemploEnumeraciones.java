package n2;

public class EjemploEnumeraciones {

	public static void main(String [] args)
	{
		System.out.println("Valor 1: " + Dias.LUNES);
		System.out.println("Continente 1: " + Continentes.AFRICA + " Con " + Continentes.AFRICA.getPaises() + " paises");
	
		indicarDia(Dias.SABADO);
	}
	
	private static void indicarDia(Dias dias)
	{
		switch(dias)
		{
		  case VIERNES:
			  System.out.println("Hoy es viernes");
			  break;
		   case SABADO:
			   System.out.println("Hoy es sabado");
			   break;
		   case DOMINGO:
			   System.out.println("Hoy es domingo");
			   break;
		}
	}
}
