package beans;

import javax.ejb.Stateless;
import javax.swing.JOptionPane;

/**
 * Session Bean implementation class User
 */
@Stateless
public class User implements UserRemote, UserLocal {

    /**
     * Default constructor. 
     */
    public User() {
        // TODO Auto-generated constructor stub
    }

	public void enviarNombre(String nombre) {
		// TODO Auto-generated method stub
		String texto ="El nombre ingresado es: " + nombre;
		JOptionPane.showMessageDialog(null, texto);
	}

}
