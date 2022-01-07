package inputsoutputs;

import java.io.*;

public class EntradaDatos1 {

	public static void main(String [] args) throws IOException
	{
		String captura;
		InputStreamReader input = new InputStreamReader(System.in);
		BufferedReader brInput = new BufferedReader(input);
		System.out.println("Escribe algo");
		captura=brInput.readLine();
		System.out.println(captura);
	}
}
