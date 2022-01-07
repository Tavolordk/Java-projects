/**
 * created by gus666
 */
function sumar()
{
	try
	{
		var a = prompt("Inserte un n\u00FAmero: ", "");
		//validamos si el valor de la cadena es nulo
		if(!a || isNaN (a))
		{
			throw new Error("Valor inv\u00E1lido al insertar el primer n\u00FAmero, intente de nuevo");
		}
		var b = prompt("Inserte otro n\u00FAmero: ", "");
		//volvemos a validar si el valor proporcionado es nulo
		if(!b || isNaN (b))
		{
			throw new Error("Valor inv\u00E1lido al insertar el segundo n\u00FAmero, intente de nuevo");
		}

		//convertimos la cadena a int
		var c = parseInt(a) + parseInt(b);
		alert("La suma es: " + c);
	}
	catch(e)
	{
		alert("El error es: " + e.message);
	}
}