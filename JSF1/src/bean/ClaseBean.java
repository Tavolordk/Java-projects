package bean;

import javax.naming.NamingException;

import delegates.UserDelegate;

public class ClaseBean {

UserDelegate userDelegate;

private String nombre="Nombre por Defecto";

public ClaseBean() throws NamingException
{
	userDelegate = new UserDelegate();
}

public String getNombre() {
	return nombre;
}

public void setNombre(String nombre) {
	this.nombre = nombre;
}

public String llamarPagina1()
{
	return "pagina1";
}

public String paginaFormulario()
{
	return "pagina2";
}


public String enviarDato()
{
	userDelegate.enviarNombre(getNombre());
	return "pagina1";
}

}
