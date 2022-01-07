package datos;

import excepcion.*;

public class ImplementacionOracle implements AccesoDatos {

	private boolean simularError;
	@Override
	public void insertar()  throws AccesoDatosEx{
		// TODO Auto-generated method stub
		if(simularError)
		{
			throw new EscrituraDatosEx("Error de escritura de datos");
		}
		
		else
		{
			System.out.println("Insertar desde Oracle");
		}
		
	}

	@Override
	public void listar()  throws AccesoDatosEx{
		// TODO Auto-generated method stub
		if(simularError)
		{
			throw new LecturaDatosEx("Error de lectura de datos");
		}
		
		else
		{
			System.out.println("Listar desde Oracle");
		}
		
	}

	public void simularError(boolean simularError) {
		// TODO Auto-generated method stub
		this.simularError = simularError;
	}

	public boolean isSimularError() {
		return this.simularError;
	}

}
