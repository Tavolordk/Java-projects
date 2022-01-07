import java.util.ArrayList;
import java.util.List;
import javax.faces.bean.ManagedBean;

@ManagedBean
public class Componentes {
	private String dia;
	
    List <String> listaDias;
	
    public Componentes()
	{
		listaDias=new ArrayList<>();
		listaDias.add("Lunes");
		listaDias.add("Martes");
		listaDias.add("Miercoles");
		listaDias.add("Jueves");
		listaDias.add("Viernes");
		listaDias.add("Sabado");
		listaDias.add("Domingo");
	}
    
    public List<String> getListaDias() {
		return listaDias;
	}
	
	public String diaSeleccionado()
	{
		String seleccion=""+ dia;
		
		return seleccion;
	}
	
	public String getDia() {
		return dia;
	}

	public void setDia(String dia) {
		this.dia = dia;
	}
	

}
