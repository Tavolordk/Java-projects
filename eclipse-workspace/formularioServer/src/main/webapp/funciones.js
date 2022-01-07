/**
 * created by gus666
 */
function validarForma(forma) {
	var usuario = forma.usuario;
	if(usuario.value == "" || usuario.value == "Escribe tu usuario")
		{
		   alert("Debe de proporcionar un nombre de usuario");
		   usuario.focus();
		   usuario.select();
		   return false;
		}
	var password = forma.password;
	if(password.value == "" || password.value.length<8)
	{
	   alert("Debe de proporcionar una contrase\u00F1a mayor a 8 caracteres");
	   password.focus();
	   password.select();
	   return false;
	}
	var tecnologia = forma.tecnologia;
	var checkSeleccionado = false;
	for(var i=0; i<tecnologia.length;i++)
		{
		    if(tecnologia[i].checked)
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
	for(var i=0;i<generos.length;i++)
		{
		   if(generos[i].checked)
			   {
			      radioSeleccionado = true;
			   }
		}
	if(!radioSeleccionado)
		{
		   alert("Debe seleccionar un g\u00E9nero");
		   return false;
		}
	var ocupacion = forma.ocupacion;
	if(ocupacion.value == "")
	{
	   alert("Debe seleccionar una ocupaci\u00F3n");
	   return false;
	}
	alert("Enviando datos al servidor...");
	return true;
}