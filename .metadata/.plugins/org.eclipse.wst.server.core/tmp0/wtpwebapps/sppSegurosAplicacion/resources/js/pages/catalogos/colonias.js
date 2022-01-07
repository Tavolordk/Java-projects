/**
 * 
 */

$(document).ready(function() {

	//coloniasC.extraerColonias();
	coloniasC.obtenerColonias();
	//obtenerColoniasByEstadoByMunicipio();
	sepomexC.obtenerEstados();
	sepomexC.cargarSelectMunicipios();
});

	//Accion guardar Colonias
	$('#btnGuardarColonia').click(function(){
		coloniasC.guardarColonias();
	});


