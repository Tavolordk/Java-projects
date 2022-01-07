/**
 * 
 */

$(document).ready(function() {

	tipoCambioC.obtenertipoCambio();
	monedaC.extraerMoneda();
	//monedaC.obtenerMoneda();
	//Accion guardar Tipo Cambio
	$('#btnGuardarTipoCambio').click(function(){
		tipoCambioC.guardarTipoCambio('#formTipoCambioNuevo','#nuevoTipoModal');
	});
	
	$('#btnEditTipoCambio').click(function(){
		tipoCambioC.guardarTipoCambio('#formTipoCambioEditar','#editarTipoCambioModal');
	});
	
});

