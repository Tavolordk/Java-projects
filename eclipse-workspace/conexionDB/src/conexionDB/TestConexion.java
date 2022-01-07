package conexionDB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TestConexion {

	public static void main(String[] args) {
		Conexion conexion = new Conexion();
		Connection cn = null;
		Statement stm = null;
		ResultSet rs = null;
		try {
			cn = conexion.conectar();
			stm = cn.createStatement();
			rs = stm.executeQuery("SELECT * FROM persona");
			
			while(rs.next())
			{
				int idUsuario = rs.getInt(1);
				String nombre = rs.getString(2);
				String apellidos = rs.getString(3);
				String email = rs.getString(4);
				String telefono = rs.getString(5);
				System.out.println(idUsuario + " " + nombre + " " + apellidos + " " + email + " " + telefono);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		finally
		{
			try {
				if (rs!=null)
				{
					rs.close();
				}
				if (stm!=null)
				{
					stm.close();
				}
				if (cn!=null)
				{
					cn.close();
				}
			}
			catch (Exception e){
				e.printStackTrace();
			}
		}

	}

}
