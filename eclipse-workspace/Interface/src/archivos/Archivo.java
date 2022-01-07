package archivos;

import java.io.*;

public class Archivo {

	public static void crearArchivo(String nombreArchivo)
	{
		File archivo = new File(nombreArchivo);
		try {
			PrintWriter salida = new PrintWriter(archivo);
			salida.close();
			System.out.println("El archivo se ha creado correctamente");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
	}
	
	public static void escribirArchivo(String nombreArchivo)
	{
		File archivo = new File(nombreArchivo);
		try {
			PrintWriter salida = new PrintWriter(archivo);
			String contenido = "Hola tavo";
			salida.println(contenido);
			salida.close();
			System.out.println("\nSe ha escrito correctamente al archivo, fin de escritura");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
	}
	
	public static void leerArchivo(String nombreArchivo)
	{
		File archivo = new File(nombreArchivo);
		try {
			BufferedReader entrada = new BufferedReader(new FileReader(archivo));
			String lectura = entrada.readLine();
			while(lectura != null)
			{
				System.out.println(lectura);
				lectura = entrada.readLine();
			}
			entrada.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
	}
	
	public static void anexarArchivo(String nombreArchivo)
	{
		File archivo = new File(nombreArchivo);
		try {
			PrintWriter salida = new PrintWriter(new FileWriter(archivo, true));
			String contenido = "Anexando información";
			salida.println(contenido);
			salida.close();
			System.out.println("Se anexo correctamente");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
		
	}
}
