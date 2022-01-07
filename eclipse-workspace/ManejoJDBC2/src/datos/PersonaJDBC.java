package datos;
import java.sql.*;
import java.util.*;

import domain.Persona;
public class PersonaJDBC {

	private Connection ConexionTransaccional;
	private static final String SQL_SELECT ="SELECT * FROM persona";
	private static final String SQL_INSERT ="INSERT INTO persona(nombre, apellidos, email, telefono) VALUES(?, ?, ?, ?)";
	private static final String SQL_UPDATE = "UPDATE persona SET nombre=?, apellidos=?, email=?, telefono=? WHERE id_persona=?";
	private static final String SQL_DELETE = "DELETE FROM persona WHERE id_persona=?";
	
	public PersonaJDBC()
	{
		
	}
	
	public PersonaJDBC(Connection conexionTransaccional)
	{
		this.ConexionTransaccional = conexionTransaccional;
	}
	public List<Persona> select() throws SQLException
	{
		Connection cnn =null;
		PreparedStatement stmt =null;
		ResultSet rs =null;
		Persona persona = null;
		List<Persona> personas = new ArrayList<Persona>();
		
		try {
			cnn = this.ConexionTransaccional != null ? this.ConexionTransaccional : Conexion2.getConnection();
			stmt = cnn.prepareStatement(SQL_SELECT);
			rs = stmt.executeQuery();
			while(rs.next())
			{
				int id_persona = rs.getInt("id_persona");
				String nombre = rs.getString("nombre");
				String apellidos = rs.getString("apellidos");
				String email = rs.getString("email");
				String telefono = rs.getString("telefono");
				persona = new Persona();
				persona.setId_persona(id_persona);
				persona.setNombre(nombre);
				persona.setApellido(apellidos);
				persona.setEmail(email);
				persona.setTelefono(telefono);
				personas.add(persona);
			}
		} 
		finally
		{
			Conexion2.close(rs);
			Conexion2.close(stmt);
			if(this.ConexionTransaccional == null)
			{
				Conexion2.close(cnn);
			}
		}
		return personas;
	}
	
	public int insert (Persona persona) throws SQLException
	{
		Connection cnn = null;
		PreparedStatement stmt = null;
		int rows = 0;
		
		try {
			cnn = this.ConexionTransaccional != null ? this.ConexionTransaccional : Conexion2.getConnection();
			stmt = cnn.prepareStatement(SQL_INSERT);
			stmt.setString(1, persona.getNombre());
			stmt.setString(2, persona.getApellido());
			stmt.setString(3, persona.getEmail());
			stmt.setString(4, persona.getTelefono());
			System.out.println("Ejecutando consulta: " + SQL_INSERT);
			rows=stmt.executeUpdate();
			System.out.println("Registros afectados: " + rows);
		} 
		finally
		{
			Conexion2.close(stmt);
			if(this.ConexionTransaccional == null)
			{
				Conexion2.close(cnn);
			}
			
		}
		return rows;
	}
	
	public int update(Persona persona) throws SQLException
	{
		Connection cnn = null;
		PreparedStatement stmt = null;
		int rows = 0;
		try {
			cnn = this.ConexionTransaccional != null ? this.ConexionTransaccional : Conexion2.getConnection();
			System.out.println("Ejecutando consultado: " + SQL_UPDATE);
			stmt = cnn.prepareStatement(SQL_UPDATE);
			stmt.setString(1, persona.getNombre());
			stmt.setString(2, persona.getApellido());
			stmt.setString(3, persona.getEmail());
			stmt.setString(4, persona.getTelefono());
			stmt.setInt(5, persona.getId_persona());
			
			rows = stmt.executeUpdate();
			System.out.println("Registros actualizados: " + rows);
		} 
		
		finally
		{
			Conexion2.close(stmt);
			if(this.ConexionTransaccional == null)
			{
				Conexion2.close(cnn);
			}
		}
		return rows;
	}
	
	public int delete(Persona persona) throws SQLException
	{
		Connection cnn = null;
		PreparedStatement stmt = null;
		int rows = 0;
		try {
			cnn = this.ConexionTransaccional != null ? this.ConexionTransaccional : Conexion2.getConnection();
			System.out.println("Ejecutando consulta: " + SQL_DELETE);
			stmt = cnn.prepareStatement(SQL_DELETE);
			stmt.setInt(1, persona.getId_persona());
			rows = stmt.executeUpdate();
			System.out.println("Registros eliminados: " + rows);
		} 
		finally
		{
			Conexion2.close(stmt);
			if(this.ConexionTransaccional == null)
			{
				Conexion2.close(cnn);
			}
		}
		return rows;
	}
}
