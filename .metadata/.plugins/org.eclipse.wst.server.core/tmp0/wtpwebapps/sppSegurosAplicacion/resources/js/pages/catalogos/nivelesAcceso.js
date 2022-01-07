/**
 * 
 */

$(document).ready(function() {

	nivelesAccesoC.obtenerNivelesAcceso();
	
	//Accion guardar Niveles Acceso
	$('#btnGuardarNivelAcceso').click(function(){
		nivelesAccesoC.guardarNivelesAcceso();
	});
});

