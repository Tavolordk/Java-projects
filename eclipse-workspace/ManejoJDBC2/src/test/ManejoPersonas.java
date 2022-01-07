package test;

import java.sql.*;

import datos.Conexion2;
import datos.PersonaJDBC;
import domain.Persona;

public class ManejoPersonas {

	public static void main(String[] args) {
		Connection conexion = null;
		try {
			conexion = Conexion2.getConnection();
			if(conexion.getAutoCommit())
			{
				conexion.setAutoCommit(false);
			}
			
			PersonaJDBC personajdbc = new PersonaJDBC(conexion);
			Persona cambioPersona = new Persona();
			cambioPersona.setId_persona(3);
			cambioPersona.setNombre("José Amador");
			cambioPersona.setApellido("Olea Gómez");
			cambioPersona.setEmail("Olea.pepe@hotmail.com");
			cambioPersona.setTelefono("6241640599");
			personajdbc.update(cambioPersona);
			
			Persona nuevaPersona = new Persona();
			nuevaPersona.setNombre("Ezequiel");
			nuevaPersona.setApellido("Martínez Castrejon");
			nuevaPersona.setEmail("eze@gmail.com");
			nuevaPersona.setTelefono("5566890923");
			personajdbc.insert(nuevaPersona);
			
			conexion.commit();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
			System.out.println("Entramos al rollback");
			try {
				conexion.rollback();
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace(System.out);
			}
		}

	}

}
