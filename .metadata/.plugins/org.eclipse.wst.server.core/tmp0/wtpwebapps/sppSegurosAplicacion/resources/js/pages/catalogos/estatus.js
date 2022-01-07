/**
 * 
 */
$(document).ready(function() {
	estatusC.obtenerEstatus();
	estatusC.extraerEstatus();
	//Accion guardar Estatus
	$('#btnGuardarEstatus').click(function(){
		estatusC.guardarEstatus('#formEstatusNuevo','#nuevoEstatusModal');
	});

	$('#actualizarEstatus').click(function(){
		estatusC.guardarEstatus('#formEstatusEditar','#editarEstatusModal');
	});
	
	
});