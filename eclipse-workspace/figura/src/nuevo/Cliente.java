package nuevo;
import java.util.*;

public class Cliente extends Person{
	private int idCliente;
	private Date fechaRegistro;
	private boolean vip;
	private static int contadorCliente;
	
	public Cliente(Date fechaRegistro, boolean vip)
	{
		this.idCliente = ++contadorCliente;
		this.fechaRegistro = fechaRegistro;
		this.vip = vip;
	}

	public int getIdCliente() {
		return idCliente;
	}

	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(Date fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	public boolean isVip() {
		return vip;
	}

	public void setVip(boolean vip) {
		this.vip = vip;
	}

	public static int getContadorCliente() {
		return contadorCliente;
	}

	@Override
	public String toString() {
		return super.toString() + "Cliente [idCliente=" + idCliente + ", fechaRegistro=" + fechaRegistro + ", vip=" + vip + "]";
	}


}
