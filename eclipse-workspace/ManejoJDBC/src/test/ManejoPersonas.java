package test;

import java.util.List;

import datos.PersonaJDBC;
import domain.Persona;

public class ManejoPersonas {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PersonaJDBC personajdbc = new PersonaJDBC();
		List<Persona> personas = personajdbc.select();
		
		for(Persona persona: personas)
		{
			System.out.println(persona);
		}
		
		//Persona persona = new Persona();
		///persona.setNombre("Pepe");
		//persona.setApellido("Olea");
		//persona.setEmail("olea.pepe@hotmail.com");
		//persona.setTelefono("6241640599");
		
		//personajdbc.insert(persona);
		//Persona persona2 = new Persona();
		//persona2.setId_persona(4);
		//persona2.setNombre("José Amador");
		//persona2.setApellido("Olea Gómez");
		//persona2.setEmail("Olea.pepe@hotmail.com");
		//persona2.setTelefono("5566890913");
		//personajdbc.update(persona2);
		
		Persona persona3 = new Persona();
		persona3.setId_persona(4);
		personajdbc.delete(persona3);
		persona3.setId_persona(5);
		
		personajdbc.delete(persona3);

	}

}
