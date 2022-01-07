/**
 * 
 */

$(document).ready(function() {
	ramoC.ramo();
	//ramoC.extraerRamo();
	ramoC.obtenerRamo();
	
	
	//Accion guardar Ramo
//	$('#btnGuardarRamo').click(function(){
//		ramoC.guardarRamo();
//	});
	
	$('#btnGuardarRamo').click(function(){
		ramoC.guardarRamo('#formRamoNuevo','#nuevoRamoModal');
	});
	
	$('#btnEditRamo').click(function(){
		ramoC.guardarRamo('#formRamoEditar','#editarRamoModal');
	});
	
});

