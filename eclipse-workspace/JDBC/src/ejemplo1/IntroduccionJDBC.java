package ejemplo1;
import java.sql.*;
public class IntroduccionJDBC {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		String url = "jdbc:mysql://localhost:3306/prueba";
		String usuario ="root";
		String password ="";
		try {
			Connection conexion = DriverManager.getConnection(url, usuario, password);
			Statement instruccion = conexion.createStatement();
			String sql = "SELECT * FROM persona";
			ResultSet resultado = instruccion.executeQuery(sql);
			while (resultado.next())
			{
				System.out.println(" " + resultado.getInt(1) +" "+ resultado.getInt(2)+" " + resultado.getInt(3)+" " + resultado.getInt(4) +" "+ resultado.getInt(5));
			}
			resultado.close();
			instruccion.close();
			conexion.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace(System.out);
		}
	}

}
