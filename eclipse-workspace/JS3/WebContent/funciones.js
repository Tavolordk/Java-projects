/**
 * 
 */
window.onload=cargarImagen;

function cargarImagen()
{
	for(var i = 0; i < document.images.length; i++)
	{
		if(document.images[i].parentNode.tagName == "A")
		{
             configuraRollover(document.images[i]);
		}
	}
}

function configuraRollover(imagen)
{
   imagen.imagenOff = new Image();
   imagen.imagenOff.src = "burro_off2.gif";
   imagen.onmouseout = cambiaOff;

   imagen.imagenOn = new Image();
   imagen.imagenOn.src = "burro_on.jpg";
   imagen.onmouseover = cambiaOn;
}

function cambiaOff()
{
	this.src = this.imagenOff.src;
}

function cambiaOn()
{
	this.src = this.imagenOn.src;
}