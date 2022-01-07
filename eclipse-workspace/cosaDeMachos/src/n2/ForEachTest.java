package n2;

public class ForEachTest {

	public static void main(String [] args)
	{
		Personita p[] = {new Personita("Tavo"), new Personita("Pedro"), new Personita("Pepe")};
		for(Personita persona : p)
		{
			System.out.println(persona);
		}
	}
}