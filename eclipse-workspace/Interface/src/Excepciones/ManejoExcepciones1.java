package Excepciones;

public class ManejoExcepciones1 {

	//public static void main(String [] args) throws OperacionExcepcion
	//primera forma de propagar la excepcion con throws mas clase de la excepcion
	public static void main(String [] args)
	{
		try {
			Division division = new Division(10,0);
		} catch (OperacionExcepcion e) {
			// TODO Auto-generated catch block
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
	//Otra forma de propagar excepcion es con try y catch como se muestra
		System.out.println("El programa continua");
}
}
