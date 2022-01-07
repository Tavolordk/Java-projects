/**
 * 
 */

$(document).ready(function() {

	bancosC.obtenerBanco();
	
});
	//Accion guardar Bancos
	$('#btnGuardarBanco').click(function(){
		bancosC.guardarBanco('#formBancoNuevo','#nuevoBancoModal');
	});
	
	$('#btnEditBanco').click(function(){
		bancosC.guardarBanco('#formBancosEditar','#editarBancosModal');
	});
	
