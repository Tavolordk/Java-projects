window.onload= iniciaDatos;

function iniciaDatos()
{
	document.getElementById("link").onclick = validaSalida;
	document.getElementById("linkSearch").onclick=busqueda;
}

function validaSalida()
{
	if(confirm("¿Desea salir del sitio?"))
	{
		alert("Redireccionando a google");
		return true;
	}

	else
	{
		alert("Seguirá en este sitio");
		return false;
	}

}

function busqueda()
{
	var respuesta = prompt("¿Qué deseas buscar?","");
	if(respuesta)
	{
		alert("Buscando: " + respuesta);
		var nuevoLink = this + "search?q=" + respuesta;
		alert("Redireccionando a " + nuevoLink);
		window.location = nuevoLink;
		return false;
	}
	else
	{
		alert("No has proporcionado algo para buscar");
		return false;
	}
}
