package datos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


import domain.Usuario;

public class UsuarioJDBC {

	private static final String SQL_SELECT ="SELECT * FROM usuario";
	private static final String SQL_INSERT ="INSERT INTO usuario(usuario, password) VALUES(?, ?)";
	private static final String SQL_UPDATE = "UPDATE usuario SET usuario=?, password=? WHERE id_usuario=?";
	private static final String SQL_DELETE = "DELETE FROM usuario WHERE id_usuario=?";
	
	public List<Usuario> select()
	{
		Connection cnn =null;
		PreparedStatement stmt =null;
		ResultSet rs =null;
		Usuario usuario = null;
		List<Usuario> usuarios = new ArrayList<Usuario>();
		
		try {
			cnn = Conexion2.getConnection();
			stmt = cnn.prepareStatement(SQL_SELECT);
			rs = stmt.executeQuery();
			while(rs.next())
			{
				int id_usuario = rs.getInt("id_usuario");
				String nombreUsuario = rs.getString("usuario");
				String password = rs.getString("password");
				usuario = new Usuario();
				usuario.setId_usuario(id_usuario);
				usuario.setUsuario(nombreUsuario);
				usuario.setPassword(password);
				usuarios.add(usuario);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
		finally
		{
			Conexion2.close(rs);
			Conexion2.close(stmt);
			Conexion2.close(cnn);
		}
		return usuarios;
	}
	
	public int insert (Usuario usuario)
	{
		Connection cnn = null;
		PreparedStatement stmt = null;
		int rows = 0;
		
		try {
			cnn = Conexion2.getConnection();
			stmt = cnn.prepareStatement(SQL_INSERT);
			stmt.setString(1, usuario.getUsuario());
			stmt.setString(2, usuario.getPassword());
			System.out.println("Ejecutando consulta: " + SQL_INSERT);
			rows=stmt.executeUpdate();
			System.out.println("Registros afectados: " + rows);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
		finally
		{
			Conexion2.close(stmt);
			Conexion2.close(cnn);
			
		}
		return rows;
	}
	
	public int update(Usuario usuario)
	{
		Connection cnn = null;
		PreparedStatement stmt = null;
		int rows = 0;
		try {
			cnn = Conexion2.getConnection();
			System.out.println("Ejecutando consulta: " + SQL_UPDATE);
			stmt = cnn.prepareStatement(SQL_UPDATE);
			stmt.setString(1, usuario.getUsuario());
			stmt.setString(2, usuario.getPassword());
			stmt.setInt(3, usuario.getId_usuario());
			
			rows = stmt.executeUpdate();
			System.out.println("Registros actualizados: " + rows);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
		
		finally
		{
			Conexion2.close(stmt);
			Conexion2.close(cnn);
		}
		return rows;
	}
	
	public int delete(Usuario usuario)
	{
		Connection cnn = null;
		PreparedStatement stmt = null;
		int rows = 0;
		try {
			cnn = Conexion2.getConnection();
			System.out.println("Ejecutando consulta: " + SQL_DELETE);
			stmt = cnn.prepareStatement(SQL_DELETE);
			stmt.setInt(1, usuario.getId_usuario());
			rows = stmt.executeUpdate();
			System.out.println("Registros eliminados: " + rows);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
		finally
		{
			Conexion2.close(stmt);
			Conexion2.close(cnn);
		}
		return rows;
	}
}
