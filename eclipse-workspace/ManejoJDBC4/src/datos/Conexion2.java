package datos;
import java.sql.*;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
public class Conexion2 {

	private static final String JDBC_URL ="jdbc:mysql://localhost:3306/prueba?useSSL=false&serverTimezone=UTC";
	private static final String JDBC_USER ="root";
	private static final String JDBC_PASS ="";
	
	public static DataSource getDataSource()
	{
		BasicDataSource bs = new BasicDataSource();
		bs.setUrl(JDBC_URL);
		bs.setUsername(JDBC_USER);
		bs.setPassword(JDBC_PASS);
		//Definimos el tamaño inicial del pool de conexiones
		bs.setInitialSize(5);
		return bs;
	}
	
	public static Connection getConnection () throws SQLException
	{
		return getDataSource().getConnection();
	}
	
	public static void close(ResultSet rs)
	{
		try {
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
	}
	
	public static void close(PreparedStatement stmt)
	{
		try {
			stmt.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
	}
	
	public static void close(Connection cn)
	{
		try {
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
	}
}
