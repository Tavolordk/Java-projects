package JavaBean;

public class ManejoJavaBeans {

	public static void main(String [] args)
	{
		PersonaBean bean = new PersonaBean();
		bean.setEdad(23);
		bean.setNombre("Tavo");
		
		System.out.println(bean.getNombre() + " " + bean.getEdad());
		
		PersonaBean b2 = new PersonaBean("Octavio", 23);
		
		System.out.println(b2);
	}
}
