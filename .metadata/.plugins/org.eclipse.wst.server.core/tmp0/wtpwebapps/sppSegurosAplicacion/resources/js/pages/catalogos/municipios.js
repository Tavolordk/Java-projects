/**
 * 
 */

$(document).ready(function() {

	municipiosC.extraerMunicipios();
	sepomexC.obtenerEstados();
	
	//Accion guardar Municipios
	$('#btnGuardarMunicipio').click(function(){
		municipiosC.guardarMunicipios();
	});
	
	$('#btnGuardarMunicipio').click(function(){
		municipiosC.guardarMunicipios('#formMunicipiosNuevo','#nuevoMunicipioModal');
	});
	
	$('#btnEditMunicipio').click(function(){
		municipiosC.guardarMunicipios('#formMunicipiosEditar','#editarMunicipiosModal');
	});
	
});


