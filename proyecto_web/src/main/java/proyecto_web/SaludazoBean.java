package proyecto_web;

import javax.faces.bean.ManagedBean;

@ManagedBean
public class SaludazoBean {

	private String mensaje="Bienvenidos a Maven perros!";

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
}
