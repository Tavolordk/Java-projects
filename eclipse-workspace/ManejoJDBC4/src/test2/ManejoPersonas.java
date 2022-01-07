package test2;

import java.sql.*;
import java.util.List;

import datos.Conexion2;
import datos.PersonaDao;
import datos.PersonaDaoJDBC;
import domain.PersonaDTO;

public class ManejoPersonas {

	public static void main(String[] args) {
		Connection conexion = null;
		try {
			conexion = Conexion2.getConnection();
			if(conexion.getAutoCommit())
			{
				conexion.setAutoCommit(false);
			}
			
			PersonaDao personadao = new PersonaDaoJDBC(conexion);
			List<PersonaDTO> personas = personadao.select();
			
			for(PersonaDTO persona: personas)
			{
				System.out.println(persona);
			}
			
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
