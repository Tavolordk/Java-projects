package delegates;

import java.util.Properties;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import beans.UserInterface;

public class UserDelegate implements UserInterface{
	
	UserInterface userInterfaceDelegate;
	
	public UserDelegate() throws NamingException
	{
		Properties propiedades = new Properties();
		propiedades.setProperty("java.naming.factory.initial", "org.jnp.interfaces.NamingContextFactory");
		propiedades.setProperty("java.naming.provider.url", "localhost:1099");
		propiedades.setProperty("java.naming.factory.url.pkgs", "org.jboss.naming");
		
		userInterfaceDelegate = (UserInterface) new InitialContext(propiedades).lookup("User/remote");
	}

	public void enviarNombre(String nombre) {
		// TODO Auto-generated method stub
		userInterfaceDelegate.enviarNombre(nombre);
	}

}
