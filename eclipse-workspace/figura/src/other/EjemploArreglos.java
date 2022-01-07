package other;

public class EjemploArreglos {

	public static void main(String [] args)
	{
		int edades [] = {12, 34, 5, 50,0,3};
		//edades = new int[3];
		//edades[0] = 30;
		//edades[1] = 12;
		//edades[2] = 10;
		
		Arreglo p [] = new Arreglo[4];
		p [0] = new Arreglo("Juan");
		p [2] = new Arreglo("Tavo");
		
		Arreglo p2[] = {new Arreglo("Gus"), new Arreglo("tavo")};
		
		for(int i=0; i<edades.length;i++)
		{
			System.out.println(i + " " + edades[i]);
		}
		
		for(int j=0; j<p.length;j++)
		{
			System.out.println(j + " " + p[j]);
		}
		
		int [][] edad = {{50,2,3},{3,40,56},{23,56,90}};
		for(int a=0;a<3;a++)
		{
			for(int b=0;b<3;b++)
			{
				System.out.println( edad[a][b]);
			}
		}
}
	
}