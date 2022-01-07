package archivos;

public class ManejoArchivos {

	public static void main(String [] args)
	{
		String nombreArchivo = "C:\\Users\\Tavol\\Desktop\\tavo\\texto.txt";
		//creamos archivo
		Archivo.crearArchivo(nombreArchivo);
		//escribir en el archivo
		Archivo.escribirArchivo(nombreArchivo);
		//leer archivo
		Archivo.leerArchivo(nombreArchivo);
		//Agregar nueva información
		Archivo.anexarArchivo(nombreArchivo);
		Archivo.leerArchivo(nombreArchivo);
	}
}
