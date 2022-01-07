package test2;

import java.util.List;

import datos.UsuarioJDBC;
import domain.Usuario;

public class ManejoUsuarios {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		UsuarioJDBC usuariojdbc = new UsuarioJDBC();
		List<Usuario> usuarios = usuariojdbc.select();
		
		for(Usuario usuario: usuarios )
		{
			System.out.println(usuario);
		}
		
		Usuario usuario = new Usuario();
		//usuario.setUsuario("Tavusia");
		//usuario.setPassword("Tavolordk1");
		//usuariojdbc.insert(usuario);
		//usuario.setUsuario("TaviTrve");
		//usuario.setPassword("Tavolordk3");
		//usuario.setId_usuario(2);
		//usuariojdbc.update(usuario);
		usuario.setId_usuario(2);
		usuariojdbc.delete(usuario);
		
	}

}
