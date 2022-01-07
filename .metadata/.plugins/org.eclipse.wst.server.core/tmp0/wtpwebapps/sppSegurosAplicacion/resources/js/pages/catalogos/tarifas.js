/**
 * 
 */

$(document).ready(function() {

	tarifasC.extraerTarifa();
	tarifasC.obtenerTarifas();
	
	//Accion guardar Tarifas
	$('#btnGuardarTarifa').click(function(){
		tarifasC.guardarTarifas();
	});
});

