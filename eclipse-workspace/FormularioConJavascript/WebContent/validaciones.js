/**
 *created by gus666 
 Funcion para validar los archivos *
 */
function validarForma(forma)
{
   //validamos el usuario
   var usuario = forma.usuario;
   if(usuario.value== "" || usuario.value=="Escribir usuario")
   {
	   alert("Debe proporcionar un nombre de usuario");
	   usuario.focus();
	   usuario.select();
	   return false;
   }

   var password = forma.password;
   if(password.value=="" || password.value.length<8)
   {
	   alert("Debe proporcionar una contrase\u00F1a de al menos 8 caracteres");
	   password.focus();
	   password.select();
	   return false;
   }

   var tecnologias = forma.tecnologia;
   var checkSeleccionado = false;
   for(i=0;i<tecnologias.length;i++)
   {
	   if(tecnologias[i].checked)
	   {
		   checkSeleccionado = true;
	   }
   }
   if(!checkSeleccionado)
   {
	   alert("Debe seleccionar una tecnolog\u00EDa");
	   return false;
   }

   var generos = forma.genero;
   var radioSeleccionado = false;
   for(i=0;i<generos.length;i++)
   {
	   if(generos[i].checked)
	   {
		   radioSeleccionado = true;
	   }
   }
   if(!radioSeleccionado)
   {
	   alert("Debe seleccionar el g\u00E9nero");
	   return false;
   }

   var ocupacion = forma.ocupacion;
   if(ocupacion.value=="")
   {
	   alert("Debe seleccionar una ocupaci\u00F3n");
	   return false;
   }

   alert("Formulario validado, enviando datos...");
   return true;
}