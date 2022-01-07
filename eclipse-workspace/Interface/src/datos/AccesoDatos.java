package datos;

import excepcion.AccesoDatosEx;

public interface AccesoDatos {
	
	//puede ser implementada como public static final int pero con solo indicar int basta gracias al compilador
	int MAX_REGISTROS = 10;
	//los metodos pueden ser implementados como public abstract tiporetorno o solo el tiporetorno gracias al compilador
	void insertar() throws AccesoDatosEx;
	void listar() throws AccesoDatosEx;
	void simularError(boolean simularError);

}
